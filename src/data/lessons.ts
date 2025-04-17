import { Lesson } from '../types/lesson';

export const lessons: Lesson[] = [
    {
        id: 1,
        title: "Early Germanic Tribes",
        content: `The Germanic tribes were diverse groups that inhabited northern Europe from 
        1000 BCE onwards. These fierce warriors developed complex social structures and 
        unique cultural traditions that would later influence medieval European society.

        Key Points:
        • The Battle of Teutoburg Forest (9 CE) - A decisive victory against Roman legions
        • Complex tribal hierarchies and democratic assemblies called "things"
        • Rich mythology featuring gods like Odin, Thor, and Freya
        • Advanced metalworking and craftsmanship
        
        The Germanic peoples' resistance to Roman rule would shape the cultural and 
        political landscape of Europe for centuries to come.`,
        duration: 30,
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1610371312296-dec5e48692e4",
        era: "Ancient",
        pages: [
            {
                type: 'text',
                content: `The Germanic tribes were diverse groups that inhabited northern Europe from 
                1000 BCE onwards. These fierce warriors developed complex social structures and 
                unique cultural traditions that would later influence medieval European society.`,
            },
            {
                type: 'image',
                content: 'Ancient Germanic artifacts showcase their craftsmanship',
                image: "https://images.unsplash.com/photo-1599739291060-4578e77dac5d"
            }
        ],
        additionalImages: [
            {
                url: "https://images.unsplash.com/photo-1599739291060-4578e77dac5d",
                caption: "Ancient Germanic artifacts"
            },
            {
                url: "https://images.unsplash.com/photo-1590674899484-d5642f835238",
                caption: "Traditional Germanic weapons"
            }
        ],
        theme: {
            primary: 'var(--color-medieval)',
            secondary: 'var(--color-gold)'
        }
    },
    {
        id: 2,
        title: "The Holy Roman Empire",
        content: `The Holy Roman Empire, established in 962 CE under Otto I, became the 
        dominant force in medieval Europe. This complex political entity would shape 
        German history for nearly a millennium.`,
        duration: 35,
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1569587112025-0d460e81a126",
        era: "Medieval",
        pages: [
            {
                type: 'text',
                content: `The Holy Roman Empire, established in 962 CE under Otto I, became the 
                dominant force in medieval Europe. This complex political entity would shape 
                German history for nearly a millennium.`
            },
            {
                type: 'image',
                content: 'Medieval cathedral architecture showcasing Gothic style',
                image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84"
            },
            {
                type: 'text',
                content: `Key Developments:
                • Coronation of Charlemagne as first Holy Roman Emperor (800 CE)
                • The Golden Bull of 1356 - Establishing election procedures
                • Rise of powerful principalities and free imperial cities
                • Development of Gothic architecture and medieval universities`
            }
        ],
        additionalImages: [
            {
                url: "https://images.unsplash.com/photo-1548345680-f5475ea5df84",
                caption: "Medieval cathedral architecture"
            },
            {
                url: "https://images.unsplash.com/photo-1541944743827-e04aa6427c33",
                caption: "Imperial regalia"
            }
        ],
        theme: {
            primary: 'var(--color-prussian)',
            secondary: 'var(--color-gold)'
        }
    },
    {
        id: 3,
        title: "The Reformation Era",
        content: `Martin Luther's posting of the 95 Theses in 1517 sparked the Protestant 
        Reformation, fundamentally changing European society.`,
        duration: 40,
        level: "Advanced",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
        era: "Renaissance",
        pages: [
            {
                type: 'text',
                content: `Martin Luther's posting of the 95 Theses in 1517 sparked the Protestant 
                Reformation, fundamentally changing European society.`
            },
            {
                type: 'image',
                content: 'The historic Cologne Cathedral',
                image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5"
            }
        ],
        theme: {
            primary: 'var(--color-accent-blue)',
            secondary: 'var(--color-accent-gold)'
        }
    }
];