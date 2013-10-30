```javascript
series = influxdb.query(
  "select percentile(value, 90) from response_times " +
  "group by time(1h) where time > now() - 2d;");

series = influxdb.query(
  "select count(email) from events " +
  "group by time(10m) " +
  "where email =~ /.*gmail\.com/ and time > now() - 1d");
```