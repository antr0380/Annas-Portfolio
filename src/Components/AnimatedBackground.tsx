
import './AnimatedBackground.css'; // Här importerar du CSS-filen
import type { SheepStyle, CloudStyle } from '../css-custom-properties';
import type { SetSheepList, SetCloudList } from '../types';
import { useState, useEffect, useCallback } from 'react';
import usePageVisibility from './usePageVisibility';
import baaSound from '../assets/baa.mp3'; 

interface Sheep {
  id: number;
  styles: SheepStyle;
  isFlipped: boolean;
  animationState: 'idle' | 'grazing';
}

interface Cloud {
  id: number;
  styles: CloudStyle;
  size: string;
}

//------------------------------------------------------------------------------------------------------------
//                                          SHEEP LOGIC
//------------------------------------------------------------------------------------------------------------

const playBaaSound = () => {
  // Här skapas Audio-objektet en gång när funktionen anropas
  const audio = new Audio(baaSound); 
  audio.volume = 0.5; // Ställ in volymen (exempel)
  audio.currentTime = 0; 
  audio.play(); 

  console.log("klickat på ett får, borde spela upp ljud");

  // Använd play() som returnerar ett Promise och fånga felet
  audio.play().catch(error => {
    // Om du ser detta i konsolen, är det blockerat av webbläsaren.
    console.warn("Ljuduppspelning blockerad. Kontrollera webbläsarens autoplay-policy.");
    console.error(error);
  });
};

function useSheepManager(){
  const initialSheep = createInitialSheep();
  const [sheepList, setSheepList] = useState<Sheep[]>(initialSheep); // State för att lagra alla får på skärmen
  const [nextId, setNextId] = useState(0); // State för att hålla koll på nästa unika ID

  const SHEEP_REMOVAL_TIME = 20000;
  const SHEEP_MIN_SPAWN_DELAY = 3000; // 3 sekunder
  const SHEEP_MAX_SPAWN_DELAY = 7000; // 7 sekunder
  
  // Denna funktion använder useCallback för att undvika onödiga omräkningar
  const spawnSheep = useCallback(() => {
    const randomLeft = Math.floor(Math.random() * 200); 
    const shouldBeFlipped = Math.random() >= 0.5; 

    const newSheepStyles: SheepStyle = {
      '--sheep-left': `${randomLeft}vw`,
    };

    const newSheep: Sheep = {
      id: nextId,
      styles: newSheepStyles,
      isFlipped: shouldBeFlipped,
      animationState: 'idle'
    };
    
    setSheepList((prevList) => [...prevList, newSheep]);
    setNextId((prevId) => prevId + 1);

  }, [nextId]); // Lägg till nextId som dependency

      // NY STATE: En räknare som tickar var 10:e sekund
    const [animationToggle, setAnimationToggle] = useState(0); 

    // ********** NY LOGIK 1: TIMER **********
    useEffect(() => {
        // Körs var 10:e sekund
        const timer = setInterval(() => {
            setAnimationToggle(prev => prev + 1); 
        }, 10000); // 10000 ms = 10 sekunder

        // Städa upp
        return () => clearInterval(timer);
    }, []); // Körs bara en gång vid montering
    
    // ********** NY LOGIK 2: STATE-UPPDATERING **********
    useEffect(() => {
        // Bestäm nytt tillstånd: Jämnt nummer = idle, Udda nummer = grazing
        const newState = animationToggle % 2 === 0 ? 'idle' : 'grazing'; 

        // Uppdatera ALLA får i listan till det nya tillståndet
        setSheepList(currentList => 
            currentList.map(sheep => ({
                ...sheep,
                animationState: newState 
            }))
        );

    }, [animationToggle, setSheepList]); // Körs varje gång timern uppdaterar animationToggle

  useEffect(() => {
    const randomDelay = Math.random() * (SHEEP_MAX_SPAWN_DELAY - SHEEP_MIN_SPAWN_DELAY) + SHEEP_MIN_SPAWN_DELAY;
    const timerId = setTimeout(() => {
        spawnSheep();
    }, randomDelay);

    return () => clearTimeout(timerId); // Städa upp (cleanup) funktionen: Viktigt för att undvika minnesläckor

  }, [sheepList, spawnSheep]); // Körs när sheepList ändras (dvs. när ett får spawnat)

  useSheepRemover(sheepList, setSheepList, SHEEP_REMOVAL_TIME);

  return { 
    sheepList,
    // Du kan även returnera spawnSheep om du vill kalla den manuellt
    // spawnSheep 
  };
}

function useSheepRemover(sheepList: Sheep[], setSheepList: SetSheepList, removalTime: number){
  useEffect(() => {
    if (sheepList.length > 0) {
      const removalTimer = setTimeout(() => {
        setSheepList(prevList => prevList.slice(1)); // Ta bort det äldsta fåret från listan (FIFO)
      }, removalTime);
      return () => clearTimeout(removalTimer); // Städa upp
    }
  }, [sheepList, setSheepList, removalTime]);
}

function createInitialSheep(){
  const x_coords = ['10vw', '15vw', '30vw', '35vw', '50vw', '55vw', '70vw', '80vw', '90vw', '95vw'];
  const y_coords = ['15vh', '90vh', '70vh', '75vh', '35vh', '55vh', '10vh', '80vh', '60vh', '50vh'];
  const flipped_list = [true, false, true, true, false, false, true, false, true, false];
  const initialSheep = [];

  for (let i = 0; i < 10; i++) {
    const sheep: Sheep = {
        id: 100 + i, 
        styles: {
        '--sheep-left': x_coords[i],
        '--sheep-top': y_coords[i],
      },
      isFlipped: flipped_list[i], 
      animationState: 'idle'
    };
    initialSheep[i] = sheep;
  }
  return(initialSheep)
}

//------------------------------------------------------------------------------------------------------------
//                                          CLOUD LOGIC
//------------------------------------------------------------------------------------------------------------

function useCloudManager(){
  const initialClouds = createInitialClouds();
  const [cloudList, setCloudList] = useState<Cloud[]>(initialClouds); // State för att lagra alla får på skärmen
  const [nextCloudId, setNextCloudId] = useState(0); // State för att hålla koll på nästa unika ID

  const CLOUD_MIN_SPAWN_DELAY = 5000; 
  const CLOUD_MAX_SPAWN_DELAY = 9000; 
  const CLOUD_REMOVAL_TIME = 10000;
  
  // Denna funktion använder useCallback för att undvika onödiga omräkningar
  const spawnCloud = useCallback(() => {
    
    const randomLeft = Math.floor(Math.random() * 200); // 
    const z_value = 2000 - nextCloudId;
    const cloudSize = randomizeCloudSize();

    const newCloudStyles: CloudStyle = {
      '--cloud-left': `${randomLeft}vw`,
      '--z-value': z_value
    };

    const newCloud: Cloud = {
      id: nextCloudId,
      styles: newCloudStyles,
      size: cloudSize,
    };
    
    setCloudList((prevList) => [...prevList, newCloud]);  // 2. Lägg till det nya fåret i listan
    setNextCloudId((prevId) => prevId + 1);  // 3. Uppdatera ID för nästa får

  }, [nextCloudId]); // Lägg till nextId som dependency

  useEffect(() => {

    const randomDelay = Math.random() * (CLOUD_MAX_SPAWN_DELAY - CLOUD_MIN_SPAWN_DELAY) + CLOUD_MIN_SPAWN_DELAY;
    const timerId = setTimeout(() => {
      spawnCloud();
    }, randomDelay);

    return () => clearTimeout(timerId); // Städa upp (cleanup) funktionen: Viktigt för att undvika minnesläckor

  }, [cloudList, spawnCloud]); // Körs när sheepList ändras (dvs. när ett får spawnat)

  useCloudRemover(setCloudList, cloudList, CLOUD_REMOVAL_TIME);

  return { 
    cloudList,
    // Du kan även returnera spawnCloud om du vill kalla den manuellt
    // spawnCloud 
  };
}

function useCloudRemover(setCloudList: SetCloudList, cloudList: Cloud[], removalTime: number){
  useEffect(() => {
    if (cloudList.length > 0) {
      const removalTimer = setTimeout(() => {
        setCloudList(prevList => prevList.slice(1));
      }, removalTime);
      return () => clearTimeout(removalTimer); // Städa upp
    }
  }, [cloudList]);
}

function createInitialClouds(){
  const x_coords = ['5vw', '90vw', '70vw', '75vw', '50vw', '55vw', '10vw', '80vw', '25vw', '50vw'];
  const y_coords = ['20vh', '15vh', '30vh', '35vh', '0vh', '55vh', '70vh', '80vh', '35vh', '95vh'];
  const size_list = ['small', 'big', 'medium', 'small', 'big', 'big', 'medium', 'small', 'big', 'small'];
  const initialClouds = [];
  

  for (let i = 0; i < 10; i++) {
    const z_value = 2010 - i;
    const cloud: Cloud = {
        id: 100 + i, 
        styles: {
        '--cloud-left': x_coords[i],
        '--cloud-top': y_coords[i],
        '--z-value': z_value
      },
      size: size_list[i], 
    };
    initialClouds[i] = cloud;
  }
  return(initialClouds)
}

function randomizeCloudSize(){
  const randomSize = Math.floor(Math.random() * 10);
  let cloudSize;

  if (randomSize < 3){
    cloudSize = 'small';
  }else if(randomSize < 7){
    cloudSize = 'medium';
  }else{
    cloudSize = 'big';
  }

  return cloudSize;
}

//------------------------------------------------------------------------------------------------------------
//                                          MAIN FUNCTION
//------------------------------------------------------------------------------------------------------------

function AnimatedBackground() {

  const { sheepList } = useSheepManager(); 
  const { cloudList } = useCloudManager();

    // 1. Fånga synlighetsläget
  const isVisible = usePageVisibility();
  // 3. Bestäm vilken CSS-klass som ska användas
  const containerClass = isVisible ? '' : 'pause-animations';
  

  return (
    <div className= {`animated-background-container ${containerClass}`}>
      <div className={`layer-ground ${containerClass}`}></div>
      {sheepList.map((sheep) => (
        <div 
          key={sheep.id}
          className="sheep" 
          style={sheep.styles} 
          onClick={playBaaSound}
        >
          <div 
            className={`sheep-container ${sheep.animationState} ${containerClass} ${sheep.isFlipped ? 'flipped' : ''}`}
            role="img" 
            aria-label="Animerat får"
          />
        </div>
      ))}
      {cloudList.map((cloud) => (
        <div 
          key={cloud.id}
          className="cloud" 
          style={cloud.styles} 
        >
          <div 
            className={`cloud-container cloud-${cloud.size} ${containerClass}`}
            role="img" 
            aria-label="Animerat cloud"
          />
        </div>
      ))}
    </div>
  );
}

export default AnimatedBackground;