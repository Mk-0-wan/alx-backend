# Queuing System in JS
------------------------
- Tech Stack Nodejs, Redis, Kue
- Simple and the fastet way to retrive data from the database

---
- How to make a dump.rbd file from the redis-cli:
   - `redis-cli SAVE`
   - Ensure that the redis server is not running to avoid data obstruction 

- How to restore the data from the `.rbd` file you have generated:
    - kill the redis-server `sudo service redis-server stop`.
    - getting the directory where all your `.rdb` file are stored in redis `redis-cli config get dir`.
    - copy over the `.rdb` file to redis data recovery directory `cp /path/to/your/*.rdb/ /var/lib/redis/`.
    - restart the redis server `sudo service redis-server start`.

- After doing all the instruction above you should be able to see all the data being stored inside the redis-server
- Run `redis-cli --scan key --pattern *` gets all the keys present in the redis-server databse; your dumped data should be visible also
- Something to note about saving methods in redis:
    - `SAVE` is synchronous function( A blocking IO bound method of saving);
    - `BSAVE` is asynchronous function( Allows IO bound operation while making a dump file);
- Time taken to make the dump file depends on the amount data inside the redis-server.
