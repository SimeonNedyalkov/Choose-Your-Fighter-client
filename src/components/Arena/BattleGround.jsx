import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import rng from "../../customFunctions/rng";
import useLoader from "../../hooks/useLoader";
import WarriorsLoading from "../../loaders/WarriorsLoading";
import { useNavigate } from "react-router-dom";

export default function BattleGround() {
  const { fighterId } = useParams();
  const [isLoading] = useLoader();
  const navigation = useNavigate();

  const pickedFighter = useFetch(
    `http://localhost:3030/data/fighters/${fighterId}`,
    []
  );
  const fighters = useFetch("http://localhost:3030/data/fighters", []);
  const weapons = useFetch("http://localhost:3030/data/weapons", []);
  const armors = useFetch("http://localhost:3030/data/armors", []);

  const randomEnemyFighter = rng.generateAll(fighters, weapons, armors);
  const pickedFighterWithRandomWeaponAndArmor = rng.generateWeaponAndArmor(
    pickedFighter,
    weapons,
    armors
  );

  // const handleFight = () => {
  //     const resultFighter1 = rng.statsCalculator(pickedFighterWithRandomWeaponAndArmor);
  //     const resultFighter2 = rng.statsCalculator(randomEnemyFighter);
  //     const enemyId = randomEnemyFighter.fighter._id
  //     if(resultFighter1>resultFighter2){
  //         navigation(`/win/${fighterId}/${enemyId}`)
  //     }else if(resultFighter1<resultFighter2){
  //         navigation(`/lose/${fighterId}/${enemyId}`)
  //     }else if(resultFighter1==resultFighter2){
  //         navigation(`/draw/${fighterId}/${enemyId}`)
  //     }
  // };

  const handleFight = () => {
    const enemyId = randomEnemyFighter.fighter._id;
    navigation(`/battleground/battle-simulation/${fighterId}/${enemyId}`, {
      state: {
        pickedFighter: pickedFighterWithRandomWeaponAndArmor,
        enemyFighter: randomEnemyFighter,
      },
    });
  };

  return (
    <div className="battleGroundImage">
      {isLoading ? (
        <WarriorsLoading />
      ) : (
        <>
          <div className="battleground-welcome">
            Welcome to the Battleground
          </div>
          <div className="battleground-fighterContainer">
            <div className="battleground-yourFighter ml-4">
              <div className="battleground-fighter-name">
                {pickedFighterWithRandomWeaponAndArmor.fighter?.name}
              </div>
              <div className="battleground-fighter-image">
                <img
                  src={pickedFighterWithRandomWeaponAndArmor.fighter?.img}
                  alt="Your Fighter"
                />
              </div>
              <div className="battleground-equipment">
                <div className="battleground-equipment-title">
                  {pickedFighterWithRandomWeaponAndArmor.fighter?.name}'s
                  equipment:
                </div>
                <div className="battleground-weapon-armor">
                  <div className="equipment-item">
                    <img
                      src={pickedFighterWithRandomWeaponAndArmor.weapon?.img}
                      alt="Your Fighter's Weapon"
                    />
                    <div className="equipment-name">
                      {pickedFighterWithRandomWeaponAndArmor.weapon?.name}
                    </div>
                  </div>
                  <div className="equipment-item">
                    <img
                      src={pickedFighterWithRandomWeaponAndArmor.armor?.img}
                      alt="Your Fighter's Armor"
                    />
                    <div className="equipment-name">
                      {pickedFighterWithRandomWeaponAndArmor.armor?.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="battleground-vs">
              <img
                src="/static/images/justInCase/vs-versus-battle-icon-sign-symbol-black-red-design-transparent-background-free-png.png"
                alt="VS"
              />
            </div>
            <div className="battleground-enemyFighter mr-4">
              <div className="battleground-fighter-name">
                {randomEnemyFighter.fighter?.name}
              </div>
              <div className="battleground-fighter-image">
                <img
                  src={randomEnemyFighter.fighter?.img}
                  alt="Enemy Fighter"
                />
              </div>
              <div className="battleground-equipment">
                <div className="battleground-equipment-title">
                  {randomEnemyFighter.fighter?.name}'s equipment:
                </div>
                <div className="battleground-weapon-armor">
                  <div className="equipment-item">
                    <img
                      src={randomEnemyFighter.weapon?.img}
                      alt="Enemy Fighter's Weapon"
                    />
                    <div className="equipment-name">
                      {randomEnemyFighter.weapon?.name}
                    </div>
                  </div>
                  <div className="equipment-item">
                    <img
                      src={randomEnemyFighter.armor?.img}
                      alt="Enemy Fighter's Armor"
                    />
                    <div className="equipment-name">
                      {randomEnemyFighter.armor?.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fight-button-container">
            <button onClick={handleFight} className="fight-button">
              Fight!
            </button>
          </div>
        </>
      )}
    </div>
  );
}
