const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/signature-pad",
        name: "signature-pad-page",
        component: () => import("pages/SignaturePadPage.vue"),
      },
      {
        path: "/camera-capture",
        name: "camera-capture-page",
        component: () => import("pages/CameraCapturePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
