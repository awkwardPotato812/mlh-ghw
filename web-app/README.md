# Task Planner
This repository contains implementation of a web-based task planner app/ *Kanban board* . This is based on the MLH Global Hack Week Workshop on building a hack planner. The focus of the workshop is to build a web based planner/to-do list using `Python`, `Flask` and `sqllite`. The UI is a `React` application that provides a Kanban view of the stored tasks  

## Versions
## V3
- Created a React app for Front-end
- Added a drawable/collapsible nav bar

### V2
- Added local storage to enable persistence of task details across server restarts
- Updated flask handler code to use local persistence
- Added styles for html page
- Added basic js script in html
### V1
- Created a basic flask app to display task items, add new tasks, update existing ones and delete listed tasks
- Created HTML pages for related actions and corresponding action handlers in flask
- **Pending**: Persistence of tasks across server restarts

## Futures: Laundry List
Here, I list out a couple of extensions or features to add to the existing application.
- Additional properties for tasks:
    - Priority
    - Reminders/alerts
    - Subjects?
    - Log time spent on each task
    - Track pomodoros (like org-mode)?
- Allow for ordering tasks based on different properties
- New web-framework:
    - Try out Rocket(`Rust`) or FAST(`Python`) for funsies
    - Front-end using Next.js ?
