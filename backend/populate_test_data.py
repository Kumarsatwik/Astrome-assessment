#!/usr/bin/env python3
import sys
import os
from datetime import datetime, timezone
from database import Database

def populate_test_data():
    db = Database()

    # Sample house points data
    test_events = [
        {"id": "test_1", "category": "Gryff", "points": 50, "timestamp": datetime.now(timezone.utc).isoformat()},
        {"id": "test_2", "category": "Slyth", "points": 45, "timestamp": datetime.now(timezone.utc).isoformat()},
        {"id": "test_3", "category": "Raven", "points": 55, "timestamp": datetime.now(timezone.utc).isoformat()},
        {"id": "test_4", "category": "Huff", "points": 48, "timestamp": datetime.now(timezone.utc).isoformat()},
        {"id": "test_5", "category": "Gryff", "points": 52, "timestamp": datetime.now(timezone.utc).isoformat()},
        {"id": "test_6", "category": "Slyth", "points": 47, "timestamp": datetime.now(timezone.utc).isoformat()},
    ]

    for event in test_events:
        db.insert_event(event)
        print(f"Inserted event: {event}")

    print("Test data populated successfully!")

if __name__ == "__main__":
    populate_test_data()
