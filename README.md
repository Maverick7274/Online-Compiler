# Online-Compiler

# How to run Docker locally

* First you need to build the Docker.

```bash
$ ~ docker build -t semicolon/floc.c
```

* Renaming your Local Container(Quality of life Step)

```bash
docker rename {dynamic_old_container_name} semicolon/floc.c
```

* To run the Image that you build.
```bash
docker run -d -p 8080:5000 semicolon/floc.c
```

> NOTE : 8080:5000 -> Here 8080 is the forwarded port and 5000 is the port where the app is actually running
