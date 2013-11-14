## Count

#### Overview

COUNT() returns the number of points

#### Usage

    SELECT COUNT(column_name) FROM series_name ...

#### Description

COUNT() takes a single column name, and count the number of points
that contains a non NULL value for the given column name.

## Min

#### Overview

MIN() returns the lowest value from the specified column over a given interval.

#### Usage

    SELECT MIN(column_name) FROM series_name ...

#### Description

MIN() takes a single column name, which must be of type int64 or float64.


## Max

#### Overview

MAX() returns the highest value from the specified column over a given interval.

#### Usage

    SELECT MAX(column_name) FROM series_name ...

#### Description

MAX() takes a single column name, which must be of type int64 or float64.


## Mean

#### Overview

MEAN() returns the arithmetic mean (average) of the specified column over a given interval.

#### Usage

    SELECT MEAN(column_name) FROM series_name ...

#### Description

MEAN() takes a single column name, which must be of type int64 or float64.


## Mode

#### Overview

MODE() returns the most frequent value(s) of the specified column over a given interval.

#### Usage

    SELECT MODE(column_name) FROM series_name ...

#### Description

MODE() takes a single column name, which must be of type int64 or float64.
Since a timeseries can be multimodal (contain multiple values that occur
the same number of times), this can potentially return multiple rows.


## Median

#### Overview

MEDIAN() returns the middle value from a sorted set of values for the specified column over a given interval.

#### Usage

    SELECT MEDIAN(column_name) FROM series_name ...

#### Description

MEDIAN() is nearly equivalent to PERCENTILE(column_name, 50), except that
in the event a dataset contains an even number of points, the median will
be the average of the two middle values.


## Distinct

#### Overview

DISTINCT() returns distinct values for the given column.

#### Usage

    SELECT DISTINCT(column_name) FROM series_name ...

#### Description

DISTINCT() takes a single column name which could be of any type.

## Percentile

#### Overview

PERCENTILE() returns the Nth percentile of a sorted set of values for the specified column over a given interval.

#### Usage

    SELECT PERCENTILE(column_name, N) FROM series_name ...

#### Description

PERCENTILE() requires two values, the second of which can be either an integer
or floating point number between 0 and 100.


