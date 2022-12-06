# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities
on our platform. We're working on a new feature which will generate reports for our client
Facilities containing info on how many hours each Agent worked in a given quarter by summing up
every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked
  that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a
  PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd
like to add the ability for Facilities to save their own custom ids for each Agent they work
with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform.
Provide as much detail for each ticket as you can, including acceptance criteria,
time/effort estimates, and implementation details. Feel free to make informed guesses about any
unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan
within and between tickets, and the intelligibility of your language. You don't need to be a
native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket #1 - Create the `agent_custom_id` table

**Story**

As a `backend developer` I would like to have access to a database table that allowed me to map
`Agents` to multiple `Facilities` using different identifiers.

**Implementation Details**

We need to create a new table called `agent_custom_id` that maps the `agent` table entries to
custom `ids` defined by each `Facility`. The table should support mapping the same `Agent` to
multiple `Facilities` through a different `id`.

An index on the columns that identifies the `Facility` and the custom `id` is needed to easily
access the database `id` of an `Agent`.

**Acceptance Criteria**

The `agent_custom_id` table exists and allows performing the following tasks:

- Identifying `Agents` through custom `ids` per `Facility`.
- Storing different custom `ids` for each `Agent` on multiple `Facilities`.

** Time/Effort **

- 2 days

### Ticket #2 - Assign a custom `id` to an `Agent`

**Story**

As as a `developer` working with `Facilities`, I would like to have access to a function that allowed
me to set a custom identifier for an existing `Agent` or create a new one with a custom `id`.

**Implementation Details**

We need to create a new function that allows setting a custom `id` on existing `Agents`. We might need
an additional function just to list the `Agents` in order to get their current database `id` and so
update them accordingly.

Also, we need to update the current `Agent` creation from a `Facility` to allow setting the custom
`id` when creating the `Agent`.

** Acceptance Criteria **

1. We can assign custom `ids` to existing `Agents`.
2. We can create new `Agents` and assign them a custom `id` at creation time.

** Time/Effort **

- 2~3 days

**Blockers**

- Ticket #1

### Ticket #3 - Update `getShiftsByFacilities`

**Story**

As a `data analyst` I would like for the `getShiftsByFacilities` function to return the custom `id`
for each `Agent` on each `Shift`.

**Implementation Details**

The current function only returns the database `id` for the `Agents`. We need to include the custom
`id` of the `Agents` for the current `Facility` in order to enrich our `Reports` at a later state.

If a `customId` isn't defined, then return the value set to `null`.

**Acceptance Criteria**

- The field `customId` on each `Agent` is present set to a value or `null`.

**Time/Effort**

- 2 days

**Blockers**

- Ticket #1

### Ticket #4 - Update `generateReport`

**Story**

As a `data analyst` I would like that the `generateReport` output include the custom `ids` of the
`Agents` instead of the database `id`.

**Implementation Details**

The `generateReport` function currently identifies the `Agents` by its database `id`. It would be
preferable if the `Agents` were identified by its custom `id` value. The `getShiftsByFacilities`
should already include the custom `id` field for each `Agent`.

Since the value of the custom `id` might be `null` for a particular `Agent`, consider using the
database `id` on its place.

**Acceptance Criteria**

- The report uses the custom `id` to identify the `Agents`, if they are defined.
- The report uses the database `id` to identify an `Agent` when a custom `id` is not defined.

**Time/Effort**

- 2 days

**Blockers**

- Ticket #3
