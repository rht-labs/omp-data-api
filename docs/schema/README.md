# OMP Database Schema

The OMP backend currently is built on a mongodb backend. It consists of five collections: `users`,`customers`, `clusters`, `residencies`, and `groups`. You can see the schemas of these collections below:

* db.users

```
{
    _id: <ObjectId>,
    user_name:  <string>,
    first_name: <string>,
    last_name: <string>,
    expiration_date: <date>,
    email: <string>,
    identity_providers: {
        idm: {
            name: <string>,
            created: <bool>,
            notified: <bool>,
        },
        atlassian: {
            ....
            repetition of above object
            for each identity provider
            that a user assigned to
            ....
        }
    },
    tags: [<string>]
}
```

* db.customers

```
{
    _id: <ObjectId>,
    customer_name: <string>,
    tags: [<string>]
}
```

* db.clusters

```
{
    _id: <ObjectId>,
    logging: <bool>,
    metrics: <bool>,
    size: <string>,
    ha: <bool>,
    ocp_version: <string>,
    hosting_platform: <string>,
    tags: [<string>]
}
```

* db.residencies

```
{
    _id: <ObjectId>,
    start_date: <date>,
    end_date: <date>,
    cluster_ref: <string>,
    source_control: <string>,
    tags: [<string>],
    name: <string>
}
```

* db.groups

```
{
    _id: <ObjectId>,
    group_name: <string>,
    display_name: <string>,
    tags: [<string>]
}
```

