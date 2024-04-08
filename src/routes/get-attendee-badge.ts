import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function getAttendeeBadge(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get('/attendees/:attendeeId/badge',{
        schema: {
            summary : 'Get an attendee badge',
            tags: ['Attendees'],
            params: z.object({
                attendeeId: z.coerce.number().int(),
            }),
            response: {
                200: z.object({
                    badge: z.object({
                        name: z.string(),
                        email: z.string().email(),
                        eventTitle: z.string(),
                        checkInURl: z.string().url(),
                    })
                })
            },
        }
    }, async (request, reply ) => {
        const {attendeeId} = request.params

        const attendee = await prisma.attendee.findUnique({
            select: {
                name: true,
                email: true,
                event: {
                    select: {
                        title: true,
                    }
                }
            },
            where: {
                id: attendeeId,
            }
        })

        if (attendee === null){
            throw new BadRequest("Attendee not found.")
        }


        const baseURl = `${request.protocol}://${request.hostname}`

        const checkInURl = new URL(`/attendees/${attendeeId}/check-in`, baseURl )

        return reply.send({
            badge: {
                name: attendee.name,
                email: attendee.email,
                eventTitle: attendee.event.title,
                checkInURl: checkInURl.toString(),
            }
        })
    })
}