\echo 'Delete and recreate vaccine_hub db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE vaccine_hub;
CREATE DATABASE vaccine_hub;
\connect vaccine_hub

\i vaccine-hub-schema.sql

\echo 'Delete and recreate vaccine_hub_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE vaccine_hub_test;
CREATE DATABASE vaccine_hub_test;
\connect vaccine_hub_test

\i vaccine-hub-schema.sql
