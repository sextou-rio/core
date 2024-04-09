import Express from "express";
import eventsRouter from "./routes/events"
import usersRouter from "./routes/users"

const app = Express();

app.listen(5200)

console.log('Server running');

app.use('/events', eventsRouter);
app.use('/users', usersRouter);