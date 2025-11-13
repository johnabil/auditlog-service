# Audit Log service

in this service we have two methods of communication

1. REST API (used for other service to query on audit logs)
   and it's preferred because we need to wait for it's response
   in other services.
2. Redis Streams (used for audit logs to be stored better
   than waiting for the https request) and it's
   better to use because it has built in plugin at fastify.

### Audit Log consistency

we made sure that the audit log is consistent by using redis streams.
and if any transaction fails, it will be rolled back and the audit log
will be deleted accordingly through sending event with transaction deleted
so we can make sure that every audit log has a corresponding transaction.

### Audit log schema

- id
- timestamp (created and updated at)
- user_id
- transaction_id
- action
- before (transaction metadata before the action)
- after (transaction metadata after the action)

### APIs

``
GET /logs (paginated with filtering by user_id, transaction_id)
``

### Starting the service

You can start the service using docker compose and it's preferred to
use local db connection rather than docker db connection.
`docker compose up --build`
