import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';
import {
  createTownMutation,
  updateTownMutation,
  deleteTownMutation,
  townList,
  joinTownMutation,
} from './TestQueries';
import { UserLocation } from '../CoveyTypes';


export type ServerPlayer = { _id: string, _userName: string, location: UserLocation };

/**
 * Response from the server for a Town list request
 */
export interface TownListResponse {
  towns: CoveyTownInfo[];
}

/**
 * The format of a request to join a Town in Covey.Town, as dispatched by the server middleware
 */
export interface TownJoinRequest {
  /** userName of the player that would like to join * */
  userName: string;
  /** ID of the town that the player would like to join * */
  coveyTownID: string;
}

/**
 * The format of a response to join a Town in Covey.Town, as returned by the handler to the server
 * middleware
 */
export interface TownJoinResponse {
  /** Unique ID that represents this player * */
  coveyUserID: string;
  /** Secret token that this player should use to authenticate
   * in future requests to this service * */
  coveySessionToken: string;
  /** Secret token that this player should use to authenticate
   * in future requests to the video service * */
  providerVideoToken: string;
  /** List of players currently in this town * */
  currentPlayers: ServerPlayer[];
  /** Friendly name of this town * */
  friendlyName: string;
  /** Is this a private town? * */
  isPubliclyListed: boolean;
}

/**
 * Payload sent by client to create a Town in Covey.Town
 */
export interface TownCreateRequest {
  friendlyName: string;
  isPubliclyListed: boolean;
}

/**
 * Response from the server for a Town create request
 */
export interface TownCreateResponse {
  coveyTownID: string;
  coveyTownPassword: string;
}

/**
 * Payload sent by the client to delete a Town
 */
export interface TownDeleteRequest {
  coveyTownID: string;
  coveyTownPassword: string;
}

/**
 * Payload sent by the client to update a Town.
 * N.B., JavaScript is terrible, so:
 * if(!isPubliclyListed) -> evaluates to true if the value is false OR undefined, use ===
 */
export interface TownUpdateRequest {
  coveyTownID: string;
  coveyTownPassword: string;
  friendlyName?: string;
  isPubliclyListed?: boolean;
}

/**
 * Envelope that wraps any response from the server
 */
export interface ResponseEnvelope<T> {
  isOK: boolean;
  message?: string;
  response?: T;
}

export type CoveyTownInfo = {
  friendlyName: string;
  coveyTownID: string;
  currentOccupancy: number;
  maximumOccupancy: number
};

/* const { query, mutate } = createTestClient(server); */
export default class TownsGraphQlClient {

  private query;

  private mutate;
  
  constructor(server: ApolloServer){
    const response = createTestClient(server);
    this.query = response.query;
    this.mutate = response.mutate;
  }

  async createTown(requestData: TownCreateRequest): Promise<TownCreateResponse> {
    const { data } = await this.mutate({
      mutation: createTownMutation,
      variables: { input: requestData },
    });
    if (data.townCreateRequest.isOK) {
      return data.townCreateRequest.response;
    }
    throw new Error(`Error processing request: ${data.townCreateRequest.message}`);
  }

  async updateTown(requestData: TownUpdateRequest): Promise<void> {
    const { data } = await this.mutate({
      mutation: updateTownMutation,
      variables: { input: requestData },
    });
    if (!data || !data.townUpdateRequest.isOK) {
      throw new Error(`Error processing request: ${ data.townUpdateRequest.message}`);
    }
    return data.townUpdateRequest;
  }

  async deleteTown(requestData: TownDeleteRequest): Promise<void> {
    const { data } = await this.mutate({
      mutation: deleteTownMutation,
      variables: { input: requestData },
    });
    if (!data.townDeleteRequest.isOK) {
      throw new Error(`Error processing request: ${data.townDeleteRequest.message}`);
    }
    return data.townDeleteRequest;
  }

  async listTowns(): Promise<TownListResponse> {
    const { data } = await this.query({ query: townList });
    return data.townList.response;
  }

  async joinTown(requestData: TownJoinRequest): Promise<TownJoinResponse> {
    const { data } = await this.mutate({
      mutation: joinTownMutation,
      variables: { input: requestData},
    });

    if (data.townJoinRequest.isOK) {
      return data.townJoinRequest.response;
    }
    throw new Error(`Error processing request: ${data.townJoinRequest.message}`);
  }
}



