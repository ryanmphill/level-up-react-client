import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager"
import { useNavigate } from "react-router-dom"


export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <h3 className="game__title">{game.title}</h3>
                        <div className="game_maker">Publisher: {game.maker}</div>
                        <div className="game__players">Players needed: {game.number_of_players}</div>
                        <div className="game__skillLevel">Skill level: {game.skill_level}</div>
                        <div className="game_creator">Uploaded by: {game?.creator?.full_name}</div>
                    </section>
                })
            }
        </article>
    )
}