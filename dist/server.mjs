import {
  registerForEvent
} from "./chunk-6GQZJ4QS.mjs";
import {
  errorHandler
} from "./chunk-DCZJQNPL.mjs";
import {
  checkIn
} from "./chunk-SAJDSGQV.mjs";
import {
  createEvent
} from "./chunk-NAHWBAOA.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-SDKBHLLK.mjs";
import {
  getEventAttendees
} from "./chunk-Q73EYGVA.mjs";
import {
  getEvent
} from "./chunk-XZUQ2MID.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastidyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastidyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["aplicattion/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
