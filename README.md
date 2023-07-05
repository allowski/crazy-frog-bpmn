Crazy Frog BPMN
---
A lightweight implementation of a BPMN using Node.js.

## Description

Crazy From BPMN is meant to be a cloud-based solution running completely serverless and designed to make use of tools such as Cloud Functions, Serverless Databases and Distributed computing.

## Concepts

### Flow
A flow consists on a single flow file which specifies the tasks to be done and also de diagram to coordinate and choreograph all the tasks to make them run. 
### Task
A task is an atomic process piece that needs to run at some point. For instance the every flow must start with a Entrypoint task.
### Process
Each time a Flow gets started, a new Process instance is started to track all the context and as a reference point to understand where the state is at.
### Executors
An executor is a piece of code that given an input will output as result. We have on the project the following executors:

- Entrypoint
- Conditional
- Http Request
- User Form
- Endpoint

## REST API
This is a preview of the desired Rest API interface.

# Flow API
### POST /flows
Creates a new flow

### GET /flows/:id
Gets a new flow by its ID.

### DELETE /flows/:id
Delete a flow by its ID.

# Process API
### POST /process
Starts a new process for the given flow.

### GET /process/:id
Gets the current process data.

### DELETE /process/:id
Delete a process by its ID

## Design Considerations
The idea is to have a BPMN with nice features that will allow to conduct a flow and keep a track of every aspect of the running processes at a given time.

### Dev Key Features
- Serverless.
- Process Tree.
- Distributed computing.
- Async processing.
- Immutable database.
- Terraform.

### User Key Features
- Easy-to-use BPMN functions.
- High state visibility.
- Customizable behavior.
- Realtime notifications.
- Web-based UI.

### Why not just use Camunda or other solutions?
There are multiple pitfalls where camunda is short for a solution:
- JVM is heavy on memory.
- Scaling is hard (Sharding, Distributing and Horizontal-scaling).
- Monitoring poses a challenge even for most experienced admins.
- Lack of out-of-the-box connectors (I.e SQS, Kafka, RabbitMQ, etc.).
- Camunda is not SaaS friendly and basically forces you to use their solutions if you need more (Freemium-like behavior).
