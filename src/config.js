const config = {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-1",
      BUCKET: "phlox-upload",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://5dohszwvi4.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_myxbRarsl",
      APP_CLIENT_ID: "7su3bfp5l8tomvip0ruvrltoqt",
      IDENTITY_POOL_ID: "us-east-1:8bce8f5f-a300-4474-97c7-ea6d850b7340",
    },
  };
  
  export default config;