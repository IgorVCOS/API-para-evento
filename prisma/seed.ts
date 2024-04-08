import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: 'a8f2f1f6-9762-453b-980e-cb6fe22b00d3',
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Um evento para devs apaixonados por códigos',
            maximumAttendees: 120,
        }       
    })
}

seed().then(() =>{
    console.log('Database seeded!')
    prisma.$disconnect()
})