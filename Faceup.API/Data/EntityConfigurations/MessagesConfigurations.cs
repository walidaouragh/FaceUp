using Faceup.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Faceup.API.Data.EntityConfigurations
{
    public class MessagesConfigurations : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.HasKey(m => m.MessageId);
            builder.HasOne(d => d.Recipient)
            .WithMany(p => p.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(d => d.Sender)
            .WithMany(p => p.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);
        }
    }
}