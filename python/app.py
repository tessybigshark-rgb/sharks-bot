import os
import time


def main() -> None:
    database_url = os.getenv("DATABASE_URL", "")
    print("Sharks Bot Python worker started")
    print(f"DATABASE_URL configured: {bool(database_url)}")

    while True:
        time.sleep(60)


if __name__ == "__main__":
    main()
