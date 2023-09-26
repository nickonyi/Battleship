import './style.css'
import './modules/dom/domController'
import aiLogic from './modules/aiLogic'


const ai = aiLogic();
console.log(ai.concurrentMisses);