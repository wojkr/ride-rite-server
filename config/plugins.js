module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      accessToken: env("NETLIFY_ACCESS_TOKEN"),
      sites: [
        {
          name: "ride_rite_server_build_hook",
          id: "581e6162-2b6e-4671-8744-d26262ba6cd7",
          buildHook:
            "https://api.netlify.com/build_hooks/6533c411b9abfc6ba69bf7e6",
          branch: "master", // optional
        },
      ],
    },
  },
});
