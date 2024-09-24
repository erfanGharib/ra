import { handle404, handleErrors } from "../routes/errorHandlers.js";
import { T_Router } from "../types/T_Router.js";
import express from 'express';

export const setupRoutes = (app: ReturnType<typeof express>, routers: T_Router[]) => {
	const registeredRoutes = [];

	for (let index = 0; index < routers.length; index++) {
		const { baseRoute, routes } = routers[index];
		const router = express.Router();

		routes.forEach((val) => {
			router[val.method](
				val.route,
				...val.handlers
			)
	
			registeredRoutes.push({
				[val.method.toUpperCase()]: baseRoute + val.route
			})
		})

		app.use(baseRoute, router)
	}

    app.use(handleErrors);
    app.use(handle404);

	return registeredRoutes;
}