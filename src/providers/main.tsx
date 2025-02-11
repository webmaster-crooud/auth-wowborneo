"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider as JotaiProvider } from "jotai";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5 * 60 * 1000,
				retry: 1,
				refetchOnWindowFocus: false,
			},
		},
	});
	return (
		<JotaiProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</JotaiProvider>
	);
};
