# OMP Database Schema

The OMP backend currently is built on a mongodb backend. It consists of four collections: `users`,`customers`,`groups` and `clusters`. You can see the schemas of these collections below:

* db.users

```
{
    _id: <ObjectId>,
    user_name:  <string>,
    first_name: <string>,
    last_name: <string>,
    expiration_date: <date>,
    email: <string>,
    role: <string>,
    identity_providers: [
        {
            provider: <string>,
            created: <bool>,
            notified: <bool>,
        },
        {
            ....
            repetition of above object
            for each identity provider
            that a user assigned to
            ....
        }
    ],
    groups: [<strings>],
}
```

* db.customers

```
{
    _id: <ObjectId>,
    customer_id: <string>,
    customer_name: <string>,
    start_date: <date>,
    end_date: <date>,
    cluster_url: <string>,
    atlassian_url: <string>,
    source_control: <string>,
}
```

* db.groups

```
{
    _id: <ObjectId>,
    group_name: <string>,
    display_name: <string>,
    role: <string>,
}
```

* db.clusters

```
{
    _id: <ObjectId>,
    customer_id: <string>,
    env_id: <string>,
    logging: <bool>,
    metrics: <bool>,
    size: {
            master_node: <int>,
            app_node: <int>,
            infra_node: <int>
        },
    ha: <bool>,
    ocp_version: <string>,
    hosting_platform: <string>,
}
```
