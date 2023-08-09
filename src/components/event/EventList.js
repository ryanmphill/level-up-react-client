import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"
import { useNavigate } from "react-router-dom"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <h3 className="event__title">{event.title}</h3>
                        <div className="event__game">Game: {event?.game?.title}</div>
                        <div className="event__organizer">Organized by: {event?.organizer?.full_name}</div>
                        <div className="event__date">This event is scheduled for {event.date}</div>
                        <footer>
                            <button className="btn-postInteraction"
                                onClick={(evt) => {
                                    evt.preventDefault()
                                    navigate(`/events/${event.id}/edit`)
                                }}
                            >Edit</button>
                        </footer>
                    </section>
                })
            }
        </article>
    )
}