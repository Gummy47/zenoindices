/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import type { Draft } from "immer";

// Base state interface that all states with async operations should extend
interface BaseAsyncState {
    loading: boolean;
    error: string | null;
}

// Generic helper for handling async thunk states
export function handleAsyncThunk<
    StateType extends BaseAsyncState,
    ReturnedType,
    ArgType = void,
>(
    builder: ActionReducerMapBuilder<StateType>,
    asyncThunk: AsyncThunk<ReturnedType, ArgType, { rejectValue: string }>,
    options: {
        onPending?: (state: Draft<StateType>) => void;
        onFulfilled: (
            state: Draft<StateType>,
            action: { payload: ReturnedType },
        ) => void;
        onRejected?: (
            state: Draft<StateType>,
            action: { payload?: string },
        ) => void;
    },
) {
    builder
        .addCase(asyncThunk.pending, state => {
            if (options.onPending) {
                options.onPending(state);
            } else {
                // Default pending behavior
                state.loading = true;
                state.error = null;
            }
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
            state.loading = false;
            options.onFulfilled(state, action);
        })
        .addCase(asyncThunk.rejected, (state, action) => {
            if (options.onRejected) {
                options.onRejected(state, action);
            } else {
                // Default rejected behavior
                state.loading = false;
                state.error = action.payload as string;
            }
        });
}

// Specific helpers for common patterns
export function handleFetchAll<
    StateType extends BaseAsyncState,
    ItemType,
    ArgType = void,
    EntitiesKey extends keyof StateType = keyof StateType,
>(
    builder: ActionReducerMapBuilder<StateType>,
    asyncThunk: AsyncThunk<ItemType[], ArgType, { rejectValue: string }>,
    entitiesKey: EntitiesKey,
) {
    handleAsyncThunk(builder, asyncThunk, {
        onFulfilled: (state, action) => {
            (state as any)[entitiesKey] = action.payload;
        },
    });
}

export function handleFetchOne<
    StateType extends BaseAsyncState,
    ItemType,
    ArgType = void,
    TargetKey extends keyof StateType = keyof StateType,
>(
    builder: ActionReducerMapBuilder<StateType>,
    asyncThunk: AsyncThunk<ItemType, ArgType, { rejectValue: string }>,
    targetKey: TargetKey,
) {
    handleAsyncThunk(builder, asyncThunk, {
        onFulfilled: (state, action) => {
            (state as any)[targetKey] = action.payload;
        },
    });
}

export function handleAdd<
    StateType extends BaseAsyncState,
    ItemType,
    ArgType,
    EntitiesKey extends keyof StateType = keyof StateType,
>(
    builder: ActionReducerMapBuilder<StateType>,
    asyncThunk: AsyncThunk<ItemType, ArgType, { rejectValue: string }>,
    entitiesKey: EntitiesKey,
) {
    handleAsyncThunk(builder, asyncThunk, {
        onFulfilled: (state, action) => {
            ((state as any)[entitiesKey] as ItemType[]).push(action.payload);
        },
    });
}

export function handleUpdate<
    StateType extends BaseAsyncState,
    ItemType extends { id?: string },
    ArgType,
    EntitiesKey extends keyof StateType = keyof StateType,
    CurrentKey extends keyof StateType = keyof StateType,
>(
    builder: ActionReducerMapBuilder<StateType>,
    asyncThunk: AsyncThunk<ItemType, ArgType, { rejectValue: string }>,
    entitiesKey: EntitiesKey,
    currentKey?: CurrentKey,
) {
    handleAsyncThunk(builder, asyncThunk, {
        onFulfilled: (state, action) => {
            const entities = (state as any)[entitiesKey] as ItemType[];
            const index = entities.findIndex(
                item => item.id === action.payload.id,
            );
            if (index !== -1) {
                entities[index] = action.payload;
            }

            if (currentKey) {
                const current = (state as any)[currentKey] as ItemType | null;
                if (current?.id === action.payload.id) {
                    (state as any)[currentKey] = action.payload;
                }
            }
        },
    });
}

export function handleDelete<
    StateType extends BaseAsyncState,
    ItemType extends { id?: string },
    EntitiesKey extends keyof StateType = keyof StateType,
    CurrentKey extends keyof StateType = keyof StateType,
>(
    builder: ActionReducerMapBuilder<StateType>,
    asyncThunk: AsyncThunk<string, string, { rejectValue: string }>,
    entitiesKey: EntitiesKey,
    currentKey?: CurrentKey,
) {
    handleAsyncThunk(builder, asyncThunk, {
        onFulfilled: (state, action) => {
            const entities = (state as any)[entitiesKey] as ItemType[];
            (state as any)[entitiesKey] = entities.filter(
                item => item.id !== action.payload,
            );

            if (currentKey) {
                const current = (state as any)[currentKey] as ItemType | null;
                if (current?.id === action.payload) {
                    (state as any)[currentKey] = null;
                }
            }
        },
    });
}
