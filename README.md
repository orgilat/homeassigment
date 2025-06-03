# Part 2 – Linux Scripting & Debugging

## Answer Part 1 – Basic Script Optimization

**Improvement 1:**  
If disk usage exceeds a threshold of 90%, issue a `logger.warn` — that is, log a warning message to make the problem visible and prompt timely resolution.

**Improvement 2:**  
Before restarting a service due to high memory usage, log the event separately with details including the node name, timestamp, and memory usage — to enable tracking recurring issues on specific machines.

**Improvement 3:**  
During log archiving, separate logs by node into distinct folders or files, so each log is clearly associated with a particular machine. This facilitates easier troubleshooting and analysis.

---

## Answer Part 2 – Additional Production Improvements

**Improvement 1:**  
Add automated health checks to verify that the servers themselves are operational and reachable before starting disk and memory usage checks — for example, simple ping tests or service status verifications.

**Improvement 2:**  
Enhance logging and alerting by integrating with notification systems to notify the team of threshold breaches or service restarts in real time, rather than relying solely on logs.

---

