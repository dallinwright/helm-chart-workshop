# Welcome to the Helm Tutorial Workshop!

In this workshop, we will dive into the world of Helm, a powerful package manager for Kubernetes. We will explore how to define, install, and upgrade even the most complex Kubernetes applications.

You will learn how to create Helm charts, manage dependencies, and configure efficient deployments. We will also touch upon handling secrets in Kubernetes, using real-world examples.

This workshop is designed for developers who have a basic understanding of Kubernetes and want to level up their skills by mastering Helm.

Let's embark on this exciting journey to simplify Kubernetes application deployment with Helm!

## What is Helm?

Helm is a package manager for Kubernetes that helps you define, install, and upgrade even the most complex Kubernetes applications. It is a tool that streamlines installing and managing Kubernetes applications. Think of it like apt/yum/homebrew for Kubernetes.

Helm uses a packaging format called charts. A chart is a collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on.

## Why Helm?

Helm is a powerful tool that simplifies the deployment and management of Kubernetes applications. It provides the following benefits:

- **Reusability**: Helm charts can be shared and reused across different projects, making it easy to deploy applications consistently.
- **Versioning**: Helm charts can be versioned, making it easy to track changes and roll back to previous versions if needed.
- **Templating**: Helm uses Go templating to generate Kubernetes manifest files, allowing you to define dynamic configurations.
- **Dependency Management**: Helm allows you to manage dependencies between Kubernetes resources, making it easy to deploy complex applications.
- **Secret Management**: Helm provides a way to manage secrets in Kubernetes, allowing you to securely store sensitive information.
- **Community Support**: Helm has a large and active community, with a rich ecosystem of charts and plugins.
- **Extensibility**: Helm can be extended with plugins, allowing you to customize and extend its functionality.
- **Declarative Configuration**: Helm uses a declarative configuration format, making it easy to define and manage Kubernetes resources.
- **Upgradeability**: Helm makes it easy to upgrade applications to new versions, with support for rolling updates and rollback.
- **Auditability**: Helm provides a way to audit changes to your Kubernetes resources, making it easy to track changes and troubleshoot issues.
- **Consistency**: Helm provides a consistent way to deploy applications across different environments, making it easy to maintain consistency.
- **Productivity**: Helm simplifies the deployment and management of Kubernetes applications, allowing you to focus on building and shipping your applications.
- **Best Practices**: Helm promotes best practices for Kubernetes application deployment, making it easy to follow industry standards.
- **Integration**: Helm integrates with other tools and platforms, making it easy to use it in your existing workflows.
- **Documentation**: Helm has extensive documentation and resources, making it easy to get started and learn more about it.


The list goes on and on, but these are some of the key benefits of using Helm for Kubernetes application deployment.
Note that while the straight yaml files are ok for learning the basics they are very verbose, rigid, and hard (virtually impossible) to manage at scale. Helm is a tool that helps manage the complexity of Kubernetes deployments and is a must-have tool for anyone working with Kubernetes.

## What You Will Learn

- How to create a Helm chart for a simple application
- How to install and upgrade the application using Helm
- How to manage dependencies in Helm
- How to handle secrets in Kubernetes using Helm
- How to use Helm to deploy a real-world application

## Prerequisites

Before you begin, ensure you have the following tools installed on your local machine:

- [Docker](https://www.docker.com/products/docker-desktop)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm](https://helm.sh/docs/intro/install/)

In docker desktop, ensure you go to the Settings Icon > Kubernetes > Enable Kubernetes.
This will take a few moments to configure as it sets up a local Kubernetes cluster.

## Create your "Application Helm Chart"

Helms charts are a collection of files that describe a related set of Kubernetes resources. Helm charts are a great way to define, install, and upgrade even the most complex Kubernetes applications.

In this workshop, we will create a Helm chart for a simple application. We will then install and upgrade the application using Helm.

### Small Prep Step run this first 🎒

This is for the DEMO, do not do this in prod. This helps demonstrate the secret functionality that can be consumed by the application in a way that is external to the application and helm chart. 

```bash
kubectl create secret generic postgresql-secret \
--from-literal=username=adminuser \
--from-literal=password=password123
```

In production, there are entire tool suites for secret management, and it is a complex beast to tackle. For those who are interested, here are some resources and integration instructions for the most popular secret management tools:

- [HashiCorp Vault](https://www.vaultproject.io/docs/platform/k8s)
- [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/integrating-kube.html)
- [Azure Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/general/tutorial-kubernetes)
- [Google Cloud Secret Manager](https://cloud.google.com/kubernetes-engine/docs/tutorials/authenticating-to-cloud-platform)

Notice the links are integration documents to both introduce the tool and how to integrate to Kubernetes.

### Create a Helm Chart 🏘️

To create a Helm chart, run the following command from the terminal in a project directory, a personal favorite of mine
is to put all my projects in `~/projects` and change into it like so:

```bash
mkdir ~/projects/ && \
cd ~/projects/
```

With that out of the way we are going to create what is called a "Parent Chart" with the command:
```bash
helm create application
```

This will create a directory called `application` with the following structure:

```bash
application/
  Chart.yaml          # A YAML file containing information about the chart
  values.yaml         # The default configuration values for this chart
  charts/             # A directory containing any charts upon which this chart depends
  templates/          # A directory of templates that, when combined with values, will generate valid Kubernetes manifest files
  ...
```

#### Quick Note about Parent vs Child Charts

A parent chart is a chart that depends on one or more child charts. A child chart is a chart that is included as a dependency in a parent chart. This allows you to define complex applications as a collection of smaller, reusable charts.

More importantly it provides a way to configure a set of logical resources your application needs in your application stack
such as a database, cache layer, one-off or cronjobs, etc. that are then deployed and upgraded together as a single unit.

Helm has a huge benefit of looking at what you want to deploy versus what is actually deployed thus only changing the resources that need to be changed.

##### Common Gotcha Moment 🤯

A common gotcha that SRE's and application teams run into here is that is looks and bases this change diff on versions,
not the hash of that version, thus if you redeploy the same version of a chart it will not change the resources that
are tagged with the same version. 

**Example**: A common malpractice is changing contents in a deployed Docker image during development
and not bumping the version of the image, Helm and Kubernetes sees version x.x.x is deployed already thus not needing to
change anything, and the problem is hard to debug.

### Define the Application Helm Chart

Now that we have created the Helm chart, let's define verbally the application that we want to deploy using this chart.

Assume we have a simple web application that consists of the following components:

- A web server that serves the application UI/Frontend (For the demo, we will combine both the front and backend into one)
- A database server that stores the application data
- A cache server that caches the application data

We will create a Helm chart to deploy this application. The chart will include the following components:

- Helm parent chart for application
- Consumption of a secret for the database server
- Usage of a child sub-chart for the database server
- Usage of a child sub-chart for the cache server

We will define the Helm chart to include these components and configure them using Helm values.

### Adding a Child Chart for the Database Server

To add a child chart for the database server, we will use the `postgresql` chart from the Helm Hub. This chart provides a PostgreSQL database server that we can use for our application.

By doing this we avoid having to maintain the database configuration ourselves and allows us to reuse a common configuration many times without rewriting it thus keeping the configuration DRY (Don't Repeat Yourself).

Essentially this chart has the kubernetes deployment configuration, service, and other resources needed to run a PostgreSQL database server in Kubernetes in a basic and secure way. For the demo we show the general concept of how to use a child chart and how to configure it.

##### Common Gotcha Moment 🤯

Another common problem is that teams will deploy a database server in Kubernetes without understanding the impact
that will have on them. Kubernetes is a great tool for running stateless applications, but running stateful applications
is a whole different beast. Let's take a look at some of the problems that can arise:

- **Data Persistence**: Data in Kubernetes is ephemeral by default, meaning that if a pod dies, the data is lost. This is not the case for databases, and thus you need to configure persistent storage for your database.
- **Data Consistency**: Kubernetes is designed to run multiple instances of the same application, but databases are not designed to be run in this way. You need to configure your database to be consistent across all instances.
- **Data Backup and Recovery**: Kubernetes does not provide a built-in way to backup and recover data, so you need to configure this yourself.
- **Data Security**: Databases contain sensitive data, so you need to ensure that your database is secure and compliant with regulations such as GDPR, HIPAA, etc.
- **Data Scaling**: Databases need to be scaled differently than stateless applications, and you need to configure this yourself.
- **Data Monitoring**: Databases need to be monitored differently than stateless applications, and you need to configure this yourself.
- **Data Disaster Recovery**: Databases need to be configured for disaster recovery, and you need to configure this yourself.
- **Data High Availability**: Databases need to be configured for high availability, and you need to configure this yourself.
- **Data Performance**: Databases need to be configured for performance, and you need to configure this yourself.
- **Data Compliance**: Databases need to be configured for compliance, and you need to configure this yourself.
- **Shared Resources**: Databases are resource-intensive, and you need to ensure that they do not impact other applications running in the same cluster. This is a huge problem in multi-tenant clusters.

Not that all these can't be solved for but this is a lot of work and a lot of things to get wrong. This is why it is recommended to use a managed database service such as AWS RDS, Google Cloud SQL, or Azure Database for PostgreSQL.
