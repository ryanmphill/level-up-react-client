import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameTypes, getSingleGame, updateGame } from "../../managers/GameManager"



export const GameEditForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    // Get the selected game id
    const {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 0,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0,
        creator: 0
    })

    useEffect(() => {
        // Set state for selected game
        getSingleGame(parseInt(gameId)).then((data) => {
            const copy = { ...currentGame }
            copy.skillLevel = data.skill_level
            copy.numberOfPlayers = data.number_of_players
            copy.title = data.title
            copy.maker = data.maker
            copy.gameTypeId = data.game_type.id
            copy.creator = data.creator.id

            setCurrentGame(copy)
        })
    }, [gameId])

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const property = domEvent.target.name
        const newValue = domEvent.target.value

        const copy = { ...currentGame }
        copy[property] = newValue

        // Update game state with new value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={(e) => {changeGameState(e)}}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        placeholder="Who makes this game?"
                        value={currentGame.maker}
                        onChange={(e) => {changeGameState(e)}}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        placeholder="How many people can play this game?"
                        value={currentGame.numberOfPlayers === 0 ? "" : currentGame.numberOfPlayers}
                        onChange={(e) => {changeGameState(e)}}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        placeholder="Choose a skill level between 1 and 10"
                        value={currentGame.skillLevel === 0 ? "" : currentGame.skillLevel}
                        onChange={(e) => {changeGameState(e)}}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={(e) => { changeGameState(e) }}>

                        <option value="0">Select a game type</option>
                        {
                            gameTypes.map(gt => (
                                <option key={`gameType--${gt.id}`} value={gt.id}>
                                    {gt.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        maker: currentGame.maker,
                        creator: parseInt(currentGame.creator),
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    updateGame(game, parseInt(gameId))
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Submit Changes</button>
        </form>
    )
}