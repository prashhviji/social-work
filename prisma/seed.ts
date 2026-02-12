import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Cleanup
    await prisma.powerLog.deleteMany()
    await prisma.syncEvent.deleteMany()
    await prisma.submission.deleteMany()
    await prisma.studentProgress.deleteMany()
    await prisma.student.deleteMany()
    await prisma.skillNode.deleteMany()
    await prisma.subject.deleteMany()
    await prisma.device.deleteMany()
    await prisma.user.deleteMany()
    await prisma.village.deleteMany()

    // Create villages
    const villages = await Promise.all([
        prisma.village.create({
            data: {
                id: 'village-1',
                name: 'Sunderpura',
                district: 'Udaipur',
                state: 'Rajasthan',
                lat: 24.5854,
                lng: 73.7125,
                population: 1200,
            },
        }),
        prisma.village.create({
            data: {
                id: 'village-2',
                name: 'Karauli Kalan',
                district: 'Jaipur',
                state: 'Rajasthan',
                lat: 26.9124,
                lng: 75.7873,
                population: 850,
            },
        }),
        prisma.village.create({
            data: {
                id: 'village-3',
                name: 'Bhojasar',
                district: 'Jodhpur',
                state: 'Rajasthan',
                lat: 26.2389,
                lng: 73.0243,
                population: 640,
            },
        }),
    ])

    // Create users
    await Promise.all([
        prisma.user.create({
            data: {
                id: 'user-admin',
                name: 'Priya Sharma',
                email: 'admin@thedevice.org',
                password: 'admin123',
                role: 'ADMIN',
            },
        }),
        prisma.user.create({
            data: {
                id: 'user-teacher-1',
                name: 'Ravi Kumar',
                email: 'ravi@thedevice.org',
                password: 'teacher123',
                role: 'TEACHER',
                villageId: 'village-1',
            },
        }),
        prisma.user.create({
            data: {
                id: 'user-teacher-2',
                name: 'Meera Devi',
                email: 'meera@thedevice.org',
                password: 'teacher123',
                role: 'TEACHER',
                villageId: 'village-2',
            },
        }),
        prisma.user.create({
            data: {
                id: 'user-teacher-3',
                name: 'Suresh Yadav',
                email: 'suresh@thedevice.org',
                password: 'teacher123',
                role: 'TEACHER',
                villageId: 'village-3',
            },
        }),
        prisma.user.create({
            data: {
                id: 'user-community',
                name: 'Kamla Bai',
                email: 'community@thedevice.org',
                password: 'community123',
                role: 'COMMUNITY',
                villageId: 'village-1',
            },
        }),
    ])

    // Create devices - 2 per village
    const devices = await Promise.all([
        prisma.device.create({
            data: {
                id: 'device-1',
                serial: 'DV-RAJ-001',
                villageId: 'village-1',
                installedAt: new Date('2025-06-15'),
                lastSync: new Date('2026-02-12T10:30:00'),
                batteryPct: 87,
                solarStatus: 'CHARGING',
                deviceStatus: 'ONLINE',
                contentVersion: '2.3.1',
                uptimePct: 98.5,
            },
        }),
        prisma.device.create({
            data: {
                id: 'device-2',
                serial: 'DV-RAJ-002',
                villageId: 'village-1',
                installedAt: new Date('2025-07-20'),
                lastSync: new Date('2026-02-12T09:15:00'),
                batteryPct: 92,
                solarStatus: 'FULL',
                deviceStatus: 'ONLINE',
                contentVersion: '2.3.1',
                uptimePct: 99.1,
            },
        }),
        prisma.device.create({
            data: {
                id: 'device-3',
                serial: 'DV-RAJ-003',
                villageId: 'village-2',
                installedAt: new Date('2025-08-10'),
                lastSync: new Date('2026-02-11T18:00:00'),
                batteryPct: 45,
                solarStatus: 'DISCHARGING',
                deviceStatus: 'ONLINE',
                contentVersion: '2.3.0',
                uptimePct: 96.2,
            },
        }),
        prisma.device.create({
            data: {
                id: 'device-4',
                serial: 'DV-RAJ-004',
                villageId: 'village-2',
                installedAt: new Date('2025-09-05'),
                lastSync: new Date('2026-02-05T12:00:00'),
                batteryPct: 15,
                solarStatus: 'LOW',
                deviceStatus: 'LOW_POWER',
                contentVersion: '2.2.0',
                uptimePct: 89.3,
            },
        }),
        prisma.device.create({
            data: {
                id: 'device-5',
                serial: 'DV-RAJ-005',
                villageId: 'village-3',
                installedAt: new Date('2025-10-01'),
                lastSync: new Date('2026-02-12T11:45:00'),
                batteryPct: 73,
                solarStatus: 'CHARGING',
                deviceStatus: 'ONLINE',
                contentVersion: '2.3.1',
                uptimePct: 97.8,
            },
        }),
        prisma.device.create({
            data: {
                id: 'device-6',
                serial: 'DV-RAJ-006',
                villageId: 'village-3',
                installedAt: new Date('2025-11-15'),
                lastSync: new Date('2026-01-20T08:00:00'),
                batteryPct: 0,
                solarStatus: 'LOW',
                deviceStatus: 'MAINTENANCE',
                contentVersion: '2.1.0',
                uptimePct: 72.5,
            },
        }),
    ])

    // Create subjects
    const mathSubject = await prisma.subject.create({
        data: { id: 'subj-math', name: 'Mathematics', icon: 'calculator' },
    })
    const readingSubject = await prisma.subject.create({
        data: { id: 'subj-reading', name: 'Reading', icon: 'book-open' },
    })
    const scienceSubject = await prisma.subject.create({
        data: { id: 'subj-science', name: 'Science', icon: 'flask-conical' },
    })
    const lifeSkillsSubject = await prisma.subject.create({
        data: { id: 'subj-life', name: 'Life Skills', icon: 'heart-handshake' },
    })

    // Create skill trees for Math
    const mathRoot = await prisma.skillNode.create({
        data: { id: 'sk-math-root', subjectId: 'subj-math', title: 'Numeracy Foundations', level: 0 },
    })
    const mathNodes = await Promise.all([
        prisma.skillNode.create({
            data: { id: 'sk-math-counting', subjectId: 'subj-math', title: 'Counting 1-100', level: 1, parentId: 'sk-math-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-math-addition', subjectId: 'subj-math', title: 'Basic Addition', level: 1, parentId: 'sk-math-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-math-subtraction', subjectId: 'subj-math', title: 'Basic Subtraction', level: 1, parentId: 'sk-math-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-math-multiply', subjectId: 'subj-math', title: 'Multiplication Tables', level: 2, parentId: 'sk-math-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-math-division', subjectId: 'subj-math', title: 'Basic Division', level: 2, parentId: 'sk-math-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-math-fractions', subjectId: 'subj-math', title: 'Fractions', level: 3, parentId: 'sk-math-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-math-geometry', subjectId: 'subj-math', title: 'Shapes & Geometry', level: 3, parentId: 'sk-math-root' },
        }),
    ])

    // Create skill trees for Reading
    const readRoot = await prisma.skillNode.create({
        data: { id: 'sk-read-root', subjectId: 'subj-reading', title: 'Literacy Foundations', level: 0 },
    })
    const readNodes = await Promise.all([
        prisma.skillNode.create({
            data: { id: 'sk-read-alphabet', subjectId: 'subj-reading', title: 'Alphabet Recognition', level: 1, parentId: 'sk-read-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-read-phonics', subjectId: 'subj-reading', title: 'Phonics & Sounds', level: 1, parentId: 'sk-read-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-read-words', subjectId: 'subj-reading', title: 'Sight Words', level: 2, parentId: 'sk-read-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-read-sentences', subjectId: 'subj-reading', title: 'Simple Sentences', level: 2, parentId: 'sk-read-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-read-stories', subjectId: 'subj-reading', title: 'Story Comprehension', level: 3, parentId: 'sk-read-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-read-writing', subjectId: 'subj-reading', title: 'Creative Writing', level: 3, parentId: 'sk-read-root' },
        }),
    ])

    // Science skill nodes
    const sciRoot = await prisma.skillNode.create({
        data: { id: 'sk-sci-root', subjectId: 'subj-science', title: 'Science Exploration', level: 0 },
    })
    await Promise.all([
        prisma.skillNode.create({
            data: { id: 'sk-sci-nature', subjectId: 'subj-science', title: 'Nature & Plants', level: 1, parentId: 'sk-sci-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-sci-animals', subjectId: 'subj-science', title: 'Animals & Habitats', level: 1, parentId: 'sk-sci-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-sci-water', subjectId: 'subj-science', title: 'Water Cycle', level: 2, parentId: 'sk-sci-root' },
        }),
    ])

    // Life skills nodes
    const lifeRoot = await prisma.skillNode.create({
        data: { id: 'sk-life-root', subjectId: 'subj-life', title: 'Life Skills Basics', level: 0 },
    })
    await Promise.all([
        prisma.skillNode.create({
            data: { id: 'sk-life-hygiene', subjectId: 'subj-life', title: 'Personal Hygiene', level: 1, parentId: 'sk-life-root' },
        }),
        prisma.skillNode.create({
            data: { id: 'sk-life-teamwork', subjectId: 'subj-life', title: 'Teamwork', level: 1, parentId: 'sk-life-root' },
        }),
    ])

    // Create 40 students
    const firstNames = [
        'Aarav', 'Aditi', 'Arjun', 'Ananya', 'Bhavya', 'Chetan', 'Deepa', 'Dhruv',
        'Esha', 'Farhan', 'Gauri', 'Harsh', 'Isha', 'Jayesh', 'Kavya', 'Lakshmi',
        'Mohan', 'Neha', 'Om', 'Pooja', 'Rahul', 'Riya', 'Sahil', 'Shruti',
        'Tanvi', 'Uday', 'Vaani', 'Vikram', 'Yamini', 'Zara', 'Amit', 'Bhumi',
        'Chirag', 'Divya', 'Ekta', 'Firoz', 'Gita', 'Hemant', 'Indu', 'Jasmine',
    ]
    const ageGroups = ['6-8', '8-10', '10-12', '12-14']
    const deviceIds = ['device-1', 'device-2', 'device-3', 'device-4', 'device-5', 'device-6']
    const villageIds = ['village-1', 'village-1', 'village-2', 'village-2', 'village-3', 'village-3']

    const students = []
    for (let i = 0; i < 40; i++) {
        const deviceIndex = i % 6
        const student = await prisma.student.create({
            data: {
                id: `student-${i + 1}`,
                firstName: firstNames[i],
                ageGroup: ageGroups[i % 4],
                villageId: villageIds[deviceIndex],
                deviceId: deviceIds[deviceIndex],
                enrolledAt: new Date(2025, 5 + (i % 6), 1 + (i % 28)),
            },
        })
        students.push(student)
    }

    // Create student progress
    const allSkillNodeIds = [
        'sk-math-counting', 'sk-math-addition', 'sk-math-subtraction', 'sk-math-multiply',
        'sk-math-division', 'sk-math-fractions', 'sk-math-geometry',
        'sk-read-alphabet', 'sk-read-phonics', 'sk-read-words', 'sk-read-sentences',
        'sk-read-stories', 'sk-read-writing',
        'sk-sci-nature', 'sk-sci-animals', 'sk-sci-water',
        'sk-life-hygiene', 'sk-life-teamwork',
    ]

    for (let i = 0; i < 40; i++) {
        const numSkills = 5 + Math.floor(Math.random() * 10)
        const selectedSkills = allSkillNodeIds
            .sort(() => Math.random() - 0.5)
            .slice(0, numSkills)

        for (const skillId of selectedSkills) {
            const mastered = Math.random() > 0.4
            await prisma.studentProgress.create({
                data: {
                    studentId: `student-${i + 1}`,
                    skillNodeId: skillId,
                    masteredAt: mastered ? new Date(2025, 8 + Math.floor(Math.random() * 5), 1 + Math.floor(Math.random() * 28)) : null,
                    attempts: 1 + Math.floor(Math.random() * 8),
                    score: Math.round((40 + Math.random() * 60) * 10) / 10,
                },
            })
        }
    }

    // Create submissions
    const submissionTypes = ['PHOTO', 'VERBAL', 'PEER']
    const statuses = ['PENDING', 'APPROVED', 'APPROVED', 'APPROVED', 'REJECTED']
    const transcripts = [
        'I learned how to add numbers up to 100 today. First you add the ones, then the tens.',
        'The water cycle goes from ocean to clouds to rain. I drew a picture of the rain falling on our village.',
        'My favorite story was about the clever fox. The fox tricked the crow by saying nice things.',
        'I can count from 1 to 50 in English and Hindi now. My brother helped me practice.',
        'We planted a neem tree in the school garden. It will grow tall and give shade.',
        'I made a chart showing multiplication tables from 1 to 5. I colored each row different.',
        'Today we learned about personal hygiene. Washing hands with soap kills germs.',
        'I helped my friend Riya learn the alphabet. Teaching someone else helps you remember.',
        'Fractions are like cutting a roti into equal pieces. Half is one of two pieces.',
        'I wrote a story about our village festival. There were colors and music everywhere.',
    ]
    const teacherNotes = [
        'Excellent understanding of the concept. Very articulate explanation.',
        'Good effort. Needs more practice with the fundamentals.',
        'Creative approach! Student shows natural curiosity.',
        'Solid work. Mastery of this skill is clearly demonstrated.',
        'Needs revision. The explanation has some gaps in understanding.',
        null,
        'Outstanding project submission. Shared with the class.',
        'Good progress since last submission.',
    ]

    for (let i = 0; i < 20; i++) {
        const studentIndex = Math.floor(Math.random() * 40)
        const skillIndex = Math.floor(Math.random() * allSkillNodeIds.length)
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const sub = await prisma.submission.create({
            data: {
                id: `submission-${i + 1}`,
                studentId: `student-${studentIndex + 1}`,
                skillNodeId: allSkillNodeIds[skillIndex],
                type: submissionTypes[Math.floor(Math.random() * submissionTypes.length)],
                status,
                fileUrl: i % 3 === 0 ? `/uploads/project-${i + 1}.jpg` : null,
                transcript: transcripts[i % transcripts.length],
                teacherNote: status !== 'PENDING' ? teacherNotes[i % teacherNotes.length] : null,
                reviewedById: status !== 'PENDING' ? ['user-teacher-1', 'user-teacher-2', 'user-teacher-3'][i % 3] : null,
                reviewedAt: status !== 'PENDING' ? new Date(2026, 0, 10 + i) : null,
                confidenceScore: status !== 'PENDING' ? Math.round((60 + Math.random() * 35) * 10) / 10 : null,
                createdAt: new Date(2026, 0, 5 + Math.floor(Math.random() * 30)),
            },
        })
    }

    // Create sync events
    for (let d = 0; d < 6; d++) {
        for (let s = 0; s < 10; s++) {
            await prisma.syncEvent.create({
                data: {
                    deviceId: `device-${d + 1}`,
                    syncedAt: new Date(2026, 1, 1 + s, 8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60)),
                    recordsSynced: 10 + Math.floor(Math.random() * 90),
                    errorsLogged: Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0,
                },
            })
        }
    }

    // Create power logs — hourly data for last 7 days for each device
    for (let d = 0; d < 6; d++) {
        for (let day = 0; day < 7; day++) {
            for (let hour = 6; hour < 20; hour++) {
                const isSunny = hour >= 8 && hour <= 16
                const panelWatts = isSunny ? 20 + Math.random() * 30 : Math.random() * 5
                const batteryBase = d === 3 ? 15 : d === 5 ? 0 : 60 + Math.random() * 30
                await prisma.powerLog.create({
                    data: {
                        deviceId: `device-${d + 1}`,
                        loggedAt: new Date(2026, 1, 5 + day, hour, 0),
                        panelWatts: Math.round(panelWatts * 10) / 10,
                        batteryPct: Math.round(Math.min(100, Math.max(0, batteryBase + (isSunny ? 5 : -3))) * 10) / 10,
                        consumptionWatts: Math.round((8 + Math.random() * 7) * 10) / 10,
                    },
                })
            }
        }
    }

    console.log('✅ Seed data created successfully!')
    console.log('  - 3 villages')
    console.log('  - 5 users (1 admin, 3 teachers, 1 community)')
    console.log('  - 6 devices')
    console.log('  - 40 students')
    console.log('  - 4 subjects with skill trees')
    console.log('  - Student progress records')
    console.log('  - 20 submissions')
    console.log('  - 60 sync events')
    console.log('  - 588 power log entries')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
