## Introduction

InfluxDB features a SQL like query language. It's only used for querying for data. The HTTP API has endpoints for writing data and performing other database administration tasks. The only exception to this is [continuous queries](/docs/query_language/continuous_queries.html), which perpetually write their results into one or more time series.