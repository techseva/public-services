package com.smart.publicservices;

import android.content.Context;
import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Typeface;
import android.text.Html;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.smart.publicservices.databinding.PostItemBinding;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class PostAdapter extends RecyclerView.Adapter<PostAdapter.PostViewHolder> {

    private List<Post> postList = new ArrayList<>();
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy, hh:mm a", Locale.getDefault());

    public void setPosts(List<Post> posts) {
        this.postList = posts;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public PostViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        PostItemBinding binding = PostItemBinding.inflate(LayoutInflater.from(parent.getContext()), parent, false);
        return new PostViewHolder(binding);
    }

    @Override
    public void onBindViewHolder(@NonNull PostViewHolder holder, int position) {
        Post post = postList.get(position);

        // Title Styling
        holder.binding.titleTextView.setText(post.getPostTitle());
        String titleColor = post.getPostTitleColor() != null ? post.getPostTitleColor() : "#004AAD";
        holder.binding.titleTextView.setTextColor(Color.parseColor(titleColor));

        boolean isBold = "bold".equalsIgnoreCase(post.getPostTitleBold());
        holder.binding.titleTextView.setTypeface(null, isBold ? Typeface.BOLD : Typeface.NORMAL);

        if (post.getPostText() != null) {
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
                holder.binding.contentTextView
                        .setText(Html.fromHtml(post.getPostText().replace("\n", "<br>"), Html.FROM_HTML_MODE_COMPACT));
            } else {
                holder.binding.contentTextView.setText(Html.fromHtml(post.getPostText().replace("\n", "<br>")));
            }
        }

        if (post.getPostDate() != null) {
            holder.binding.dateTextView.setText(dateFormat.format(post.getPostDate().toDate()).toUpperCase());
        }

        // Button Styling
        if (post.getPostButtonText() != null && !post.getPostButtonText().isEmpty()) {
            holder.binding.actionButton.setVisibility(View.VISIBLE);

            // Alignment
            String alignment = post.getPostBtnPos() != null ? post.getPostBtnPos() : "flex-end";
            int gravity;
            if ("flex-start".equalsIgnoreCase(alignment)) {
                gravity = android.view.Gravity.START;
            } else if ("center".equalsIgnoreCase(alignment)) {
                gravity = android.view.Gravity.CENTER_HORIZONTAL;
            } else {
                gravity = android.view.Gravity.END;
            }
            holder.binding.buttonContainer.setGravity(gravity);

            // Text Case
            String btnText = post.getPostButtonText();
            if ("uppercase".equalsIgnoreCase(post.getPostBtnCase())) {
                holder.binding.actionButton.setText(btnText.toUpperCase());
            } else {
                holder.binding.actionButton.setText(btnText);
            }

            String btnColorStr = post.getPostButtonColor() != null ? post.getPostButtonColor() : "#0076FF";
            int btnColor = Color.parseColor(btnColorStr);

            // Style Selection
            if ("outlined".equalsIgnoreCase(post.getPostBtnStyle())) {
                holder.binding.actionButton.setBackgroundTintList(ColorStateList.valueOf(Color.TRANSPARENT));
                holder.binding.actionButton.setStrokeColor(ColorStateList.valueOf(btnColor));
                holder.binding.actionButton.setStrokeWidth(4);
                holder.binding.actionButton.setTextColor(btnColor);
                holder.binding.actionButton.setCornerRadius(12);
                holder.binding.actionButton.setElevation(0f);
            } else if ("pill".equalsIgnoreCase(post.getPostBtnStyle())) {
                holder.binding.actionButton.setBackgroundTintList(ColorStateList.valueOf(btnColor));
                holder.binding.actionButton.setTextColor(Color.WHITE);
                holder.binding.actionButton.setCornerRadius(100); // Pill shape
                holder.binding.actionButton.setElevation(4f);
            } else if ("shadow".equalsIgnoreCase(post.getPostBtnStyle())) {
                holder.binding.actionButton.setBackgroundTintList(ColorStateList.valueOf(btnColor));
                holder.binding.actionButton.setTextColor(Color.WHITE);
                holder.binding.actionButton.setCornerRadius(12);
                holder.binding.actionButton.setElevation(12f); // Enhanced shadow
            } else if ("gradient".equalsIgnoreCase(post.getPostBtnStyle())) {
                // For Android, we simulate gradient with a lighter tint or high elevation
                holder.binding.actionButton.setBackgroundTintList(ColorStateList.valueOf(btnColor));
                holder.binding.actionButton.setTextColor(Color.WHITE);
                holder.binding.actionButton.setCornerRadius(16);
                holder.binding.actionButton.setElevation(6f);
            } else if ("underline".equalsIgnoreCase(post.getPostBtnStyle())) {
                holder.binding.actionButton.setBackgroundTintList(ColorStateList.valueOf(Color.TRANSPARENT));
                holder.binding.actionButton.setTextColor(btnColor);
                holder.binding.actionButton.setPaintFlags(
                        holder.binding.actionButton.getPaintFlags() | android.graphics.Paint.UNDERLINE_TEXT_FLAG);
                holder.binding.actionButton.setCornerRadius(0);
                holder.binding.actionButton.setElevation(0f);
                holder.binding.actionButton.setPadding(0, 0, 0, 0);
            } else {
                // Default Solid
                holder.binding.actionButton.setBackgroundTintList(ColorStateList.valueOf(btnColor));
                holder.binding.actionButton.setTextColor(Color.WHITE);
                holder.binding.actionButton.setCornerRadius(12);
                holder.binding.actionButton.setStrokeWidth(0);
                holder.binding.actionButton.setElevation(4f);
                // Reset paint flags in case of recycling
                holder.binding.actionButton.setPaintFlags(
                        holder.binding.actionButton.getPaintFlags() & ~android.graphics.Paint.UNDERLINE_TEXT_FLAG);
            }

            holder.binding.actionButton.setOnClickListener(v -> {
                if (post.getPostUrl() != null && !post.getPostUrl().isEmpty()) {
                    Context context = v.getContext();
                    Intent intent = new Intent(context, WebViewActivity.class);
                    intent.putExtra("url", post.getPostUrl());
                    intent.putExtra("title", post.getPostTitle());
                    context.startActivity(intent);
                }
            });

            // Handle Extra Links (1, 2, 3)
            holder.binding.extraLinksContainer.removeAllViews();
            boolean hasLinks = false;

            addLinkIf(holder, 1, post.getLink1Title(), post.getLink1Url());
            addLinkIf(holder, 2, post.getLink2Title(), post.getLink2Url());
            addLinkIf(holder, 3, post.getLink3Title(), post.getLink3Url());

            if (post.getLink1Title() != null && !post.getLink1Title().isEmpty())
                hasLinks = true;
            if (post.getLink2Title() != null && !post.getLink2Title().isEmpty())
                hasLinks = true;
            if (post.getLink3Title() != null && !post.getLink3Title().isEmpty())
                hasLinks = true;

            holder.binding.extraLinksContainer.setVisibility(hasLinks ? View.VISIBLE : View.GONE);
        } else {
            holder.binding.actionButton.setVisibility(View.GONE);
        }
    }

    @Override
    public int getItemCount() {
        return postList.size();
    }

    static class PostViewHolder extends RecyclerView.ViewHolder {
        PostItemBinding binding;

        PostViewHolder(PostItemBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
        }
    }

    private void addLinkIf(PostViewHolder holder, int index, String title, String url) {
        if (title == null || title.isEmpty())
            return;

        TextView linkView = new TextView(holder.itemView.getContext());
        String fullText = index + ". " + title;
        linkView.setText(fullText);
        linkView.setTextColor(Color.parseColor("#0076FF"));
        linkView.setTextSize(14);
        linkView.setTypeface(null, android.graphics.Typeface.BOLD);
        linkView.setPadding(0, 4, 0, 4);
        linkView.setClickable(true);
        linkView.setFocusable(true);

        linkView.setOnClickListener(v -> {
            Context context = v.getContext();
            Intent intent = new Intent(context, WebViewActivity.class);
            intent.putExtra("url", url != null ? url : "#");
            intent.putExtra("title", title);
            context.startActivity(intent);
        });

        holder.binding.extraLinksContainer.addView(linkView);
    }
}
