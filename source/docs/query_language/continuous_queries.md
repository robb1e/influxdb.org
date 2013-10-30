## Continuous Queries

Continuous queries let you precompute expensive queries into another time series in real-time. This is useful for queries that are issued frequently on dashboards that should return very quickly. Comming soon, but here's an example:

```sql
select percentile(value, 95) 
from response_times 
group by time(5m) 
into response_times.percentiles.5m.95

select count(type) 
from events 
group by time(10m), type 
into events.count_per_type.10m
```