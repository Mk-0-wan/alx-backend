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

---
- Currently using the older version of redis( which only supports legacy callback-functions ).
- Now this will help you out in getting to know the different way to handle request to the redis-server
- One way is to turn all the callback functions into promise functions using `promisify`
- Another way is to use the newest version of redis which cames with aysnc/await functions out of the box.
- Here are some examples:
    ```
        // with legacy callback-function
        ...

        client.get('Holberton', (err, value) => {
            if (value) {
                // you will have to hadle the result inside the callback function
                console.log(value);
            }

            if (err) {
                throw new Error('Error getting the key value');
            }
        })
    ```
    - the above code works well but has some constrains, I cannot handle the result outside the callback function due to scope issues.

    ``` 
        // a cleaner way is to use promisify to all the callback functions
        // making it easier for use to use async/await functionalities to our advantage
        ...

        const getAsync = promisify(client.get).bind(client);
        const pingAsync = promisify(client.ping).bind(client);
        const quitAsync = promisify(client.quit).bind(client);

        // now we can get the results back and do what we want with ** 
        const [ping, get, quit] = await  Promise.all([
            pingAsync,
            getAsync('Holberton'),
            quitAsync
        ]);

        console.log({ping, get, quit });
    ```
