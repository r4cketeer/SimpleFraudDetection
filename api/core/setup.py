from core.db import DB

class setup:
    def create_indexes(self):
        # events
        DB.events.create_index([("eventId", 1)], unique=True)
        DB.events.create_index([("eventTime", 1)])
        DB.events.create_index([("eventTime", 1), ("eventType", 1)])
        DB.events.create_index([("eventTime", 1), ("eventType", 1), ("eventId", 1)])

        # queues
        DB.queues.create_index([("eventId", 1)], unique=True)
        DB.queues.create_index([("eventTime", 1)])
        DB.queues.create_index([("timestamp", 1)])

        # users
        DB.users.create_index([("username", 1), ("password", 1), ("active", 1)])

        # sessions
        DB.sessions.create_index([("user_pkey", 1), ("session", 1)])
        DB.sessions.create_index([("timestamp", 1)],  
            expireAfterSeconds=604800
        )

    def init_setup(self):
        self.create_indexes()