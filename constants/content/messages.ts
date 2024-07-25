import { MessageType } from "@/lib/types";

export const DUMMY_DATA: MessageType[] = [
  {
    id: "1",
    sender: "user",
    text: "What should I do during a flood?",
    timestamp: new Date("2024-07-18T10:00:00Z"),
  },
  {
    id: "2",
    sender: "assistant",
    text: "During a flood, it is important to evacuate to higher ground immediately and avoid walking or driving through flood waters.",
    timestamp: new Date("2024-07-18T10:01:00Z"),
  },
  {
    id: "3",
    sender: "user",
    text: "How can I stay safe?",
    timestamp: new Date("2024-07-18T10:02:00Z"),
  },
  {
    id: "4",
    sender: "assistant",
    text: "Stay informed by monitoring weather reports and alerts. Have an emergency kit ready, and follow instructions from local authorities.",
    timestamp: new Date("2024-07-18T10:03:00Z"),
  },
  {
    id: "5",
    sender: "user",
    text: "What should be in an emergency kit?",
    timestamp: new Date("2024-07-18T10:04:00Z"),
  },
  {
    id: "6",
    sender: "assistant",
    text: "An emergency kit should include water, non-perishable food, a flashlight, batteries, a first aid kit, medications, and important documents.",
    timestamp: new Date("2024-07-18T10:05:00Z"),
  },
  {
    id: "7",
    sender: "user",
    text: "How much water should I store?",
    timestamp: new Date("2024-07-18T10:06:00Z"),
  },
  {
    id: "8",
    sender: "assistant",
    text: "It is recommended to store at least one gallon of water per person per day for at least three days.",
    timestamp: new Date("2024-07-18T10:07:00Z"),
  },
  {
    id: "9",
    sender: "user",
    text: "What if I can’t evacuate immediately?",
    timestamp: new Date("2024-07-18T10:08:00Z"),
  },
  {
    id: "10",
    sender: "assistant",
    text: "If evacuation is not possible, move to the highest level of your home. Avoid the attic unless you have a way to signal for help, and do not climb into a closed attic to avoid becoming trapped by rising floodwater.",
    timestamp: new Date("2024-07-18T10:09:00Z"),
  },
  {
    id: "11",
    sender: "user",
    text: "What should I do if I get caught in my car during a flood?",
    timestamp: new Date("2024-07-18T10:10:00Z"),
  },
  {
    id: "12",
    sender: "assistant",
    text: "If you are caught in your car, stay inside unless water is rising inside the car. In that case, move to the roof of the car. Do not drive around barricades or through water.",
    timestamp: new Date("2024-07-18T10:11:00Z"),
  },
  {
    id: "13",
    sender: "user",
    text: "Can floods cause landslides?",
    timestamp: new Date("2024-07-18T10:12:00Z"),
  },
  {
    id: "14",
    sender: "assistant",
    text: "Yes, floods can trigger landslides. If you are in a hilly area, be alert for landslide warnings and evacuate if necessary.",
    timestamp: new Date("2024-07-18T10:13:00Z"),
  },
  {
    id: "15",
    sender: "user",
    text: "What should I do after a flood?",
    timestamp: new Date("2024-07-18T10:14:00Z"),
  },
  {
    id: "16",
    sender: "assistant",
    text: "After a flood, return home only when authorities say it is safe. Avoid floodwaters as they may be contaminated. Clean and disinfect everything that got wet to avoid mold growth.",
    timestamp: new Date("2024-07-18T10:15:00Z"),
  },
  {
    id: "17",
    sender: "user",
    text: "How can I help others during a flood?",
    timestamp: new Date("2024-07-18T10:16:00Z"),
  },
  {
    id: "18",
    sender: "assistant",
    text: "You can help by volunteering with local relief organizations, donating to emergency funds, and checking on neighbors, especially those who are elderly or have mobility issues.",
    timestamp: new Date("2024-07-18T10:17:00Z"),
  },
];

export const OFFICIALS = [
  {
    id: 1,
    name: "Police",
    image: require("../../assets/images/policeman.png"),
    route: "/message/police",
  },
  {
    id: 2,
    name: "Firefighter",
    image: require("../../assets/images/firefighter.png"),
    route: "/message/firefighter",
  },
  {
    id: 3,
    name: "Doctor",
    image: require("../../assets/images/doctor.png"),
    route: "/message/doctor",
  },
];


export const PEOPLES = [
  {
    id: 1,
    name: "Sourav",
    image: require("../../assets/images/sourav.jpg"),
    route: "/message/sourav",
  },
  {
    id: 2,
    name: "Badal",
    image: require("../../assets/images/badal.jpg"),
    route: "/message/badal",
  },
  {
    id: 3,
    name: "Sanish",
    image: require("../../assets/images/sanish.jpg"),
    route: "/message/sanish",
  },
  {
    id: 4,
    name: "Vishal",
    image: require("../../assets/images/vishal.jpg"),
    route: "/message/vishal",
  },
];
