import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "https://courseapp-famu.onrender.com/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/course-details`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetCourseDetailsQuery,useCreateCheckoutSessionMutation } = purchaseApi;
