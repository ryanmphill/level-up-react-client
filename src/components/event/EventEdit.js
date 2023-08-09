import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from "../../managers/GameManager"
import { createEvent, getSingleEvent, updateEvent } from "../../managers/EventManager"




export const EventEditForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    // Get the selected event id
    const {eventId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        title: "",
        game: 0,
        date: "",
        organizer: 0
    })

    useEffect(() => {
        // Set state for selected event
        getSingleEvent(parseInt(eventId)).then((data) => {
            const copy = { ...currentEvent }
            copy.title = data.title
            copy.game = data.game.id
            copy.date = data.date
            copy.organizer = data.organizer.id

            setCurrentEvent(copy)
        })
    }, [eventId])

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames().then(data => setGames(data))
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const property = domEvent.target.name
        const newValue = domEvent.target.value

        const copy = { ...currentEvent }
        copy[property] = newValue

        // Update game state with new value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentEvent.title}
                        onChange={(e) => {changeEventState(e)}}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" className="form-control"
                        value={currentEvent.game}
                        onChange={(e) => { changeEventState(e) }}>

                        <option value="0">Select a game for the event</option>
                        {
                            games.map(g => (
                                <option key={`eventGame--${g.id}`} value={g.id}>
                                    {g.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Date of Event: </label>
                    <input type="text" name="date" required autoFocus className="form-control"
                        placeholder="YYYY-MM-DD"
                        value={currentEvent.date}
                        onChange={(e) => {changeEventState(e)}}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        title: currentEvent.title,
                        game: parseInt(currentEvent.game),
                        date: currentEvent.date,
                        organizer: parseInt(currentEvent.organizer)
                    }

                    // Send POST request to your API
                    updateEvent(event, parseInt(eventId))
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Submit Changes</button>
        </form>
    )
}