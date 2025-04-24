import { Input } from "./types";


export const defaultInputs: Input[] = [
{
    id: "firstTimeProtection",
    label: "First time protection",
    value: false,
    searchArray: ["DIN 4102"],
    group: "fireResistantClassification",
    type: "switch",
    logoText: "DIN 4102"
},
{
    id: "thirtyMinutes",
    label: "30 Minutes",
    value: false,
    searchArray: ["UL72 class 125 - 30 minutes", "EN 15659 LFS30P"],
    time: 30,
    group: "fireResistantClassification",
  type: "switch",
    logoText: "30 Min"
},
{
    id: "sixtyMinutes",
    label: "60 Minutes",
    value: false,
    searchArray: [
      "NT Fire-017 60P",
      "EN 1047-1 S60P",
      "NT Fire 017 60P",
      "UL72 class 350 - 1 hour",
      "EN 15659 LFS60P",
      "NT Fire-017 60DIS",
      "EN 1047-1 S60DIS",
      "UL72 class 125 - 1 hour"
    ],
    time: 60,
    group: "fireResistantClassification",
  type: "switch",
  logoText: "60 Min"
},
{
    id: "ninetyMinutes",
    label: "90 Minutes",
    value: false,
    searchArray: ["NT Fire-017 90P", "EN 14470-1 90 minutes"],
    time: 90,
    group: "fireResistantClassification",
  type: "switch",
    logoText: "90 Min"
},
{
    id: "oneTwentyMinutes",
    label: "120 Minutes",
    value: false,
    searchArray: [
      "EN 1047-1 S120P",
      "NT Fire-017 120P",
      "UL72 class 350 - 2 hour",
      "EN 1047-1 S120DIS"
    ],
    time: 120,
    group: "fireResistantClassification",
  type: "switch",
    logoText: "120 Min"
},
{
  id: "noSecurity",
  label: "No security",
  value: false,
  searchArray: ["This item does not have a burglary resistant classification."],
  group: "burglaryClassification",
type: "switch",
  logoText: "None"
},
 {
    id: "securityGrade0",
    label: "Security grade 0",
    value: false,
    searchArray: ["EN 1143-1 Grade 0"],
    group: "burglaryClassification",
   type: "switch",
    logoText: "Grade 0"
},
{
    id: "securityGrade1",
    label: "Security grade 1",
    value: false,
    searchArray: ["EN 1143-1 Grade I", "EN 1143-2 Grade I"],
    group: "burglaryClassification",
  type: "switch",
    logoText: "Grade 1"
},
{
    id: "securityGrade2",
    label: "Security grade 2",
    value: false,
    searchArray: ["EN 1143-1 Grade II", "EN 1143-2 Grade II"],
    group: "burglaryClassification",
  type: "switch",
    logoText: "Grade 2"
},
{
    id: "securityGrade3",
    label: "Security grade 3",
    value: false,
    searchArray: ["EN 1143-1 Grade III","EN 1143-2 Grade III"],
    group: "burglaryClassification",
  type: "switch",
    logoText: "Grade 3"
},
{
    id: "securityGrade4",
    label: "Security grade 4",
    value: false,
    searchArray: ["EN 1143-1 Grade IV", "EN 1143-2 Grade IV"],
    group: "burglaryClassification",
  type: "switch",
    logoText: "Grade 4"
},
{
    id: "securityGrade5",
    label: "Security grade 5",
    value: false,
    searchArray: ["EN 1143-1 Grade V","EN 1143-1 Klasse V"],
    group: "burglaryClassification",
  type: "switch",
    logoText: "Grade 5"
},
{
    id: "securityGrade6",
    label: "Security grade 6 and higher",
    value: false,
    searchArray: ["EN 1143-1 Grade VI","EN 1143-1 Grade XI","EN 1143-1 Grade X","EN 1143-1 Grade XII","EN 1143-1 Grade VIII", "EN 1143-1 Grade VII", "EN 1143-1 Grade IX"],
    group: "burglaryClassification",
  type: "switch",
    logoText: "Grade 6+"
},
  {
  id: "securityLevel1",
  label: "Security Level 1",
  value: false,
  searchArray: ["EN 14 450 Security level 1"],
  group: "burglaryClassification",
    type: "switch",
  logoText: "Level 1"
},
{
  id: "securityLevel2",
  label: "Security Level 2",
  value: false,
  searchArray: ["EN 14 450 Security level 2"],
  group: "burglaryClassification",
  type: "switch",
  logoText: "Level 2"
},
{
  id: "documents",
  label: "Documents",
  value: false,
  group: "kluizenwijzer",
  searchArray: ["documenten"],
  type: "switch"
},
{
  id: "data",
  label: "Data",
  value: false,
  group: "kluizenwijzer",
  searchArray: ["data"],
  type: "switch"
},
{
  id: "money",
  label: "Money",
  value: false,
  group: "kluizenwijzer",
  searchArray: ["geld"],
  type: "switch"
},
{
  id: "jewelry",
  label: "Jewelry",
  value: false,
  group: "kluizenwijzer",
  searchArray: ["kostbaarheden"],
  type: "switch"
},
{
  id: "guns",
  label: "Guns",
  value: false,
  group: "kluizenwijzer",
  searchArray: ["wapens"],
  type: "switch"
},
{
  id: "keys",
  label: "Keys",
  value: false,
  group: "kluizenwijzer",
  searchArray: ["sleutels"],
  type: "switch"
},
{
  id: "innerHeight",
  label: "Inner Height",
  group: "dimensions",
  fields: {
    innerHeightMin: "",
    innerHeightMax: ""
  },
  type: "inputField"
},
{
  id: "outerHeight",
  label: "Outer Height",
  group: "dimensions",
  fields: {
    outerHeightMin: "",
    outerHeightMax: ""
  },
  type: "inputField"
},
{
  id: "innerWidth",
  label: "Inner Width",
  group: "dimensions",
  fields: {
    innerWidthMin: "",
    innerWidthMax: ""
  },
  type: "inputField"
},
{
  id: "outerWidth",
  label: "Outer Width",
  group: "dimensions",
  fields: {
    outerWidthMin: "",
    outerWidthMax: ""
  },
  type: "inputField"
},

  {
  id: "innerDepth",
    label: "Inner Depth",
  group: "dimensions",
  fields: {
    innerDepthMin: "",
    innerDepthMax: ""
  },
  type: "inputField"
},
{
  id: "outerDepth",
  label: "Outer Depth",
  group: "dimensions",
  fields: {
    outerDepthMin: "",
    outerDepthMax: ""
  },
  type: "inputField"
},
{
  id: "weight",
  label: "Weight",
  group: "weight",
  fields: {
    weightMin: "",
    weightMax: ""
  },
  type: "inputField"
},
{
  id: "shelves",
  label: "Shelves",
  group: "other",
  fields: {
    shelvesMin: "",
    shelvesMax: ""
  },
  type: "inputField"
},
{
  id: "drawers",
  label: "Drawers",
  group: "other",
  fields: {
    drawersMin: "",
    drawersMax: ""
  },
  type: "inputField"
},
{
  id: "hooks",
  label: "Key Hooks",
  group: "other",
  fields: {
    hooksMin: "",
    hooksMax: ""
  },
  type: "inputField"
},
{
  id: "gunHolders",
  label: "Gun holders",
  group: "other",
  fields: {
    gunHoldersMin: "",
    gunHoldersMax: ""
  },
  type: "inputField"
},{
    searchArray: ["SKG***", "SKG**"],
    logoText: "SKG"
},
]

const groupFieldsByGroupKey = (groupName) => {
    return defaultInputs.filter(input => input.group === groupName);
};

export const SECTIONS = [
    { 
        title: "Search by Fire resistance", 
        key: 'fireResistantClassification', 
        fields: [...defaultInputs.filter(input => input.group === 'fireResistantClassification')], 
        icon: "fire" 
    },
    { 
        title: "Search by Burglary Classification", 
        key: 'burglaryClassification', 
        fields: [...defaultInputs.filter(input => input.group === 'burglaryClassification')], 
        icon: "user-secret" 
    },
    { 
        title: "Search by features", 
        key: 'kluizenwijzer', 
        fields: [...defaultInputs.filter(input => input.group === 'kluizenwijzer')], 
        icon: "wand-magic" 
    },
    { 
        title: "Search by dimensions", 
        key: 'searchByDimensions', 
        fields: [...defaultInputs.filter(input => input.group === 'dimensions')], 
        icon: "expand" 
    },
    { 
        title: "Search by Weight", 
        key: 'searchByWeight', 
        fields: [...defaultInputs.filter(input => input.group === 'weight')], 
        icon: "scale-unbalanced-flip" 
    },
    { 
        title: "Search by other categories", 
        key: 'searchByOther', 
        fields: [...defaultInputs.filter(input => input.group === 'other')], 
        icon: "magnifying-glass" 
    }
];