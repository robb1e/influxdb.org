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

Note that times weren't specified in those points. In that case the server assigns them automatically. If you want to specify the time you can by including the `time` column in the POST.

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

### Querying Data
