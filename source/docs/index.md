---
title: InfluxDB Documentation
---

## Getting Started

First, you'll need a running instance of InfluxDB to work with. You can either create a [free database in our open sandbox](http://play.influxdb.org) or install locally. [Check the download page for details](/download) on how to install.

If you've created a database on [play.influxdb.org](http://play.influxdb.org) you can jump to the next section.

If you've installed locally, InfluxDB should be running on two ports. The API will be on port `8086` by default and the administrative interface will be running on `8083`. Go to [http://localhost:8083](http://localhost:8083) to login and create a database. The default login and password are `root` and `root` (don't worry you can change them later).

### How InfluxDB is Organized

Data in InfluxDB is organized into databases, time series, and events. Those can be roughly equated to databases, tables, and rows in a more traditional database. Unlike a traditional RDBMS, InfluxDB is schemaless. There can be any number of columns and new columns can be added on the fly. Column values can be strings, booleans, integers, or floats. Integers generally have a more compact encoding so they're a good choice to use when you can.

### Working in Code

We'll use the JavaScript library for the examples in this tutorial, but other languages should have similar interfaces.

#### Initialization

```javascript
influxdb = new InfluxDB(host, port, username, password, database);
```

#### Writing Data

```javascript
// with server set timestamps
influxdb.writePoints("some_series", [
    {"value": 23.0,  "state": "NY", "email": "paul@influxdb.org"},
    {"value": 191.3, "state": "CO", "email": "foo@bar.com"}
]);

// with a specified timestamp
influxdb.writePoints("response_times", [
  {time: new Date(), "value": 232}
]);
```

Note that `time` is a reserved column name. The only other reserved column name is `sequence_number`. Each datapoint is assigned a sequence number that helps to uniquely identify it. Time series names and column names should consist of only letters, numbers, hyphens, underscores, and periods.

#### Example Queries

InfluxDB has a SQL-like interface. The libraries have methods to help you construct these queries or you can issue the query directly. Here are some examples of raw queries that can be run.

```javascript
// get the latest point from the events time series
series = influxdb.query(
  "select * from events limit 1;");

// get the count of events (using the column type)
// in 5 minute periods for the last 4 hours
series = influxdb.query(
  "select count(region) from events " +
  "group by time(5m) where time > now() - 4h;");

// get the count of unique event types in 10 second
// intervals for the last 30 minutes
series = influxdb.query(
  "select count(type) from events " +
  "group by time(10s), type where time > now() - 30m;");

// get the 90th percentile for the value column of response
// times in 1 hour increments for the last 2 days
series = influxdb.query(
  "select percentile(value, 90) from response_times " +
  "group by time(1h) where time > now() - 2d;");

// get the median in 1 hour increments for the last day
series = influxdb.query(
  "select median(value) from response_times " +
  "group by time(1h) where time > now() - 1d;");

// get events from new york
series = influxdb.query(
  "select * from events " +
  "where state = 'ny';");

// get the count of events in 10 minute increments
// from users with gmail addresses
series = influxdb.query(
  "select * from events " +
  "group by time(10m) " +
  "where email =~ /.*gmail\.com/;");
```

### The Admin Interface

You can also explore data through the administrative interface. If you created a database on [Play you can get to it here](http://sandbox.influxdb.org:9062), or on your [localhost here](http://localhost:8083). There you'll be able to issue queries, see basic visualizations, and tables of the raw results.