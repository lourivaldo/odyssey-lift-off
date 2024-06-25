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
    Mutation: {
        incrementTrackViews: async (_, {id}, {dataSources}) => {
            try {
                const track = await dataSources.trackAPI.incrementTrackViews(id)
                return {
                    code: 200,
                    success: true,
                    message: 'Success',
                    track
                }
            } catch (err) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    track: null
                };
            }
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