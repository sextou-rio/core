import Express from "express";
import cookieParser from "cookie-parser"

import eventsRouter from "./routes/events"
import usersRouter from "./routes/users"
import authRouter from "./routes/auth"

const app = Express();


// Middleware
app.use(cookieParser())

// Routes
app.use('/events', eventsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(5200)

console.log('Server running');