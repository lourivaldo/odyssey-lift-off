import {Resolvers} from "./types";

export const resolvers: Resolvers = {
    Query: {
        tracksForHome: async (_, __, {dataSources}) => {
            return dataSources.trackAPI.getTracksForHome();
        },
        track: async (_, {trackId}, {dataSources}) => {
            return dataSources.trackAPI.getTrack(trackId)
        }
    },
    Track: {
        author: async ({authorId}, _, {dataSources}) => {
            return dataSources.trackAPI.getAuthor(authorId);
        },
        modules: async ({id}, _, {dataSources}) => {
            return dataSources.trackAPI.getTrackModules(id);
        }
    }
}