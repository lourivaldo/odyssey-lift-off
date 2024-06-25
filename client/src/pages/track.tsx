import React from "react";
import {Layout} from "../components";
import {gql, useQuery} from "@apollo/client"
import {Query} from "../__generated__/graphql";
import {useParams} from "react-router-dom";

const GET_TRACK = gql`
    query Track($trackId: ID!) {
        track(trackId: $trackId) {
            id
            title
            author {
                id
                name
                photo
            }
            thumbnail
            length
            modulesCount
            description
            numberOfViews
            modules {
                id
                title
                length
            }
        }
    }
`

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Track = () => {
    const {trackId} = useParams()
    const {loading, error, data} = useQuery<Query>(GET_TRACK)
    return <Layout grid>
        
    </Layout>;
};

export default Track;
