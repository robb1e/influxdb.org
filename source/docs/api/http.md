## HTTP API

The primary interface to InfluxDB is through the HTTP API. Through it you can write data, run queries, and do cluster administration.

### Writing Data

InfluxDB is split into databases which have different time series. Each time series has data points that can have any number of columns. It's like a regular database, but the columns on tables (time series) don't have to be defined up front. So the rows look like a hashmap of key value pairs. Valid characters for time series and column names include letters, numbers, dashes, underscores, or periods.

Assuming you have a database named `foo_production` you can write data by doing a `POST` to `/db/foo_production/series?u=some_user&p=some_password` with a JSON body of points. Notice that username and password are specified in the query string. Users can be restricted to having read or write access and can also be restricted by the time series name and the queries they can run, but we'll get to administration later. Here's what a sample JSON body looks like:

```json
[
  {
    "name": "events",
    "columns": ["state", "email", "type"],
    "points": [
      ["ny", "paul@influxdb.org", "follow"],
      ["ny", "todd@influxdb.org", "open"]
    ]
  },
  {
    "name": "errors",
    "columns": ["class", "file", "user", "severity"],
    "points": [
      ["DivideByZero", "example.py", "someguy@influxdb.org", "fatal"]
    ]
  }
]
```

As you can see you can write to multiple time series names in a single POST. You can also write multiple points to each series. The values in `points` must have the same index as their respective column names in `columns`. However, not all points need to have values for each column, `null`s are ok.

Note that times weren't specified in those points. In that case the server assigns them automatically. If you want to specify the time you can by including the `time` column in the POST, which should be an epoch from 1, Jan 1970 in either seconds, milliseconds, or microseconds.

```json
[
  {
    "name": "response_times",
    "columns": ["time", "value"],
    "points": [
      [1382819388, 234.3],
      [1382819389, 120.1],
      [1382819380, 340.9]
    ]
  }
]
```

When you include a time you need to specify the precision of the value in the call like `/db/foo_production/series?u=some_user&p=some_password&time_precision=m`. You can specify either second (s), millisecond (m), or microsecond (u) from epoch (1, Jan 1970). The underlying datastore keeps everything at microsecond precision, but you can specify what you'd like when writing or querying data.

#### Updating Points

Individual data points are uniquely identified by their `sequence_number`, `time` and the series name. Sequence numbers are assigned automatically by the cluster. InfluxDB isn't optimized for updates and there are no specific guarantees if multiple writers try to update a point at the same time. However, it is possible to update a point by including the sequence_number in the write. The supplied column values will be overwritten while other columns will remain unchanged.

#### Deleting Points

InfluxDB is designed to delete a range of data, not individual points. It's handy for regularly clearing out raw data to save space in the cluster or when removing data to reimport. Send a `DELETE` request to the `/db/:name/series` endpoint with the following parameters:

* `u` - username
* `p` - password
* `name` - the name of the series to delete from
* `regex` - a regex to delete from any series with a name that matches
* `start` - epoch in seconds for the start of the range. Specify 0 to go to the beginning
* `end` - epoch in seconds for the end of the range to delete

### Querying Data

Getting data from InfluxDB is done through a single endpoint. `GET db/:name/series`. It takes five parameters:

* `q` - the query
* `u` - username
* `p` - password
* `time_precision` the precision timestamps should come back in. Valid options are `s` for seconds, `m` for milliseconds, and `u` for microseconds.
* `chunked` - true|false, false is the default.

#### Query

The query parameter uses the [InfluxDB Query Language](/docs/query_language) and should be URI encoded.

#### Sample Response

Responses are JSON data that look like this

```json
[
  {
    "name": "some_series",
    "columns": ["time", "sequence_number", "column_a", "column_b"],
    "points": [
      [1383059590062, 1, "some string", true]
    ]
  }
]
```

The response is a collection of objects where each object is a collection of points from a specific time series (you can request data from multiple series in a single query). The index of the column name matches up with the associated index in each point. Some column values can be null. The `time` and `sequence_number` columns are special built in columns. Time is always returned as an epoch from 1, Jan, 1970. The precision of the epoch will be whatever was requested in the `time_precision` parameter.

The `sequence_number` will only show up on queries that return raw data points. Points can be uniquely identified by the series, time, and sequence number. When doing group by qeries, sequence numbers will not be returned.

The order of the points defaults to time desending. The only other option is to order by time ascending by adding `order asc` to the query.

#### Chunked Responses

If the request asks for a chunked response, json objects will get written to the HTTP response as they are ready. They will come in batches in the requested time order. That might look like this:

```json
{
  "name": "a_series",
  "columns": ["time", "sequence_number", "column_a"],
  "points": [
    [1383059590062, 3, 27.3],
    [1383059590062, 4, 97.1]
  ]
}
```

Then followed by

```json
{
  "name": "b_series",
  "columns": ["time", "sequence_number", "column_a"],
  "points": [
    [1383059590062, 2, 2232.1]
  ]
}
```

Then followed by

```json
{
  "name": "a_series",
  "columns": ["time", "sequence_number", "column_a"],
  "points": [
    [1383059590000, 1, 291.7],
    [1383059590000, 2, 44.1]
  ]
}
```

So the chunks for different series can be interleaved, but they will always come back in the correct time order. You should use chunked queries when pulling back a large number of data points. If you're just pulling back data for a graph, which should generally have fewer than a few thousand points, non-chunked responses are easiest to work with.