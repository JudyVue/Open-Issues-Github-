# Open-Issues-Github-
A project that allows a user to input any Github repo link and view number of open issues.

##Version 0.9
A user can copy/paste a link to any Github repo and view the number of open issues that repo has over a period of time.

At the current writing of this README, if a repo has open issues, a user will see the following:

```
<number> issues opened the last 24 hours
<number> issues opened in the past 7 days ago
<number> issues opened more than 7 days ago
```

At this point in time, Github's API only allows for 30 open issues to be returned by default. [Pagination](https://developer.github.com/guides/traversing-with-pagination/) has been utilized to customize this to 100 results, which is the maximum limit per page. Further development to show all open issues with a successful pagination loop is in the works.
