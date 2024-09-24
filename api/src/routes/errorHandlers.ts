import { T_ErrorHandler, T_RequestHandler } from "../types/T_Router.js";
import { createHttpResponse } from "../utils/createHttpResponse.js";

export const handle404: T_RequestHandler = (req, res, next) => {
	res.status(404).send(createHttpResponse(404));
}
export const handleErrors: T_ErrorHandler = (err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.send(err);
}