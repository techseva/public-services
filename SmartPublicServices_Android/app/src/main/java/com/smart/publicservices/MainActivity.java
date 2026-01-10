package com.smart.publicservices;

import android.os.Bundle;
import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.smart.publicservices.databinding.ActivityMainBinding;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;
    private PostAdapter adapter;
    private FirebaseFirestore db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        setSupportActionBar(binding.toolbar);

        db = FirebaseFirestore.getInstance();
        setupRecyclerView();
        loadUpdates();
    }

    private void setupRecyclerView() {
        adapter = new PostAdapter();
        binding.updatesRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        binding.updatesRecyclerView.setAdapter(adapter);
    }

    private void loadUpdates() {
        db.collection("updates")
                .orderBy("postDate", Query.Direction.DESCENDING)
                .addSnapshotListener((value, error) -> {
                    if (error != null) {
                        Log.e("FirestoreError", error.getMessage());
                        return;
                    }
                    if (value != null) {
                        List<Post> posts = value.toObjects(Post.class);
                        adapter.setPosts(posts);
                    }
                });
    }
}
