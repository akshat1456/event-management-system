EVENTHUB - FSD EXPERIMENT 4

1. Clone GitHub repository into eventhub-exp4.
2. Copy these server/ and client/ files into the matching locations in the clone. Replace only the six named files.
3. In server/: run npm install, then npm run dev (separately)
4. In client/: run npm install, then npm run dev (separately)
5. Import EventHub_Experiment_4.postman_collection.json into Postman.
6. Run tests in order. Request 03 sets eventId used in 04 and 05.
7. Test frontend at the Vite local URL /events; POST a new event in Postman, then click Refresh from API.
8. From repo root, run separately: git add . ; git commit -m "Implement Experiment 4 REST API and Postman testing" ; git push origin main

NOTE: in-memory server events reset when you restart Node. No .env or MongoDB setup is required for this experiment. This kit does not include prior Experiment 3 files that are absent from the remote repository.
